import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import env from '../config/env';
import { createLogger } from '../utils/logger';

const logger = createLogger('auth-middleware');

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };

    const session = await prisma.session.findFirst({
      where: {
        token,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session) {
      return res.status(401).json({ message: 'Session invalide ou expirée' });
    }

    if (!session.user.isActive) {
      return res.status(403).json({ message: 'Compte désactivé' });
    }

    req.user = session.user;
    next();
  } catch (error) {
    logger.error('Auth error:', error);
    return res.status(401).json({ message: 'Token invalide' });
  }
}

export function checkRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    next();
  };
}