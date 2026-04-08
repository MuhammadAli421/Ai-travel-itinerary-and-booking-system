import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import { sanitize } from './middleware/validate.js';
import sessionConfig from './config/session.js';
import errorHandler from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import itineraryRoutes from './routes/itineraryRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Body parsing + sanitization
app.use(express.json());
app.use(sanitize);

// Session
app.use(session(sessionConfig));

// Routes
app.use('/api/auth',        authRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/bookings',    bookingRoutes);
app.use('/api/ai',          aiRoutes);
app.use('/api/admin',       adminRoutes);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
