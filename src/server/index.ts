import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { authenticateToken } from './middleware/auth';
import { errorHandler } from './middleware/error';
import env from './config/env';
import { createLogger } from './utils/logger';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import customerRoutes from './routes/customers';
import productRoutes from './routes/products';
import invoiceRoutes from './routes/invoices';
import quoteRoutes from './routes/quotes';

const logger = createLogger('server');
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/customers', authenticateToken, customerRoutes);
app.use('/api/products', authenticateToken, productRoutes);
app.use('/api/invoices', authenticateToken, invoiceRoutes);
app.use('/api/quotes', authenticateToken, quoteRoutes);

// Error handling
app.use(errorHandler);

const PORT = env.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;