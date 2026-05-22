import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

dotenv.config();

const startServer = async () => {
  await connectDB();

  const app = express();
  const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['*'];

  app.use(cors({ origin: allowedOrigins }));
  app.use(helmet());
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));
  app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

  app.get('/api', (req, res) => {
    res.json({
      status: 'ok',
      service: 'prakriti-api',
      docs: {
        health: '/api/health',
        login: '/api/auth/login',
        register: '/api/auth/register',
        chat: 'POST /api/chat',
        chats: 'GET /api/chats'
      }
    });
  });

  app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'prakriti-api' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/chats', chatRoutes);

  app.use(notFound);
  app.use(errorHandler);

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
