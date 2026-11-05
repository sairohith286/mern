import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import booksRouter from './routes/books.js';
import authRouter from './routes/auth.js';
import ordersRouter from './routes/orders.js';
import contactRouter from './routes/contact.js';

const app = express();

app.use(cors({
  origin(origin, callback) {
    const allowed = (process.env.CLIENT_URL || 'http://localhost:3000')
      .split(',').map((value) => value.trim());
    if (!origin || allowed.includes('*') || allowed.includes(origin)) return callback(null, true);
    return callback(new Error('This origin is not allowed by CORS.'));
  }
}));
app.use(express.json({ limit: '1mb' }));

// Connect on demand; this also works in Vercel serverless functions.
app.use(async (req, res, next) => {
  try { await connectDB(); next(); }
  catch (error) { next(error); }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Marcus Book Store API' }));
app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/contact', contactRouter);

app.use((req, res) => res.status(404).json({ message: 'API route not found.' }));
app.use((error, req, res, next) => {
  console.error(error);
  if (error.message?.includes('CORS')) return res.status(403).json({ message: error.message });
  res.status(500).json({ message: 'Internal server error.' });
});

export default app;
