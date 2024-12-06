import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { createLogger } from '../utils/logger';

const logger = createLogger('error-middleware');

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
}