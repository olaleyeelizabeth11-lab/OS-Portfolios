import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import projectsRouter from './routes/projects.js';
import authRouter from './routes/auth.js';
import contactRouter from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy violation'), false);
  },
  credentials: true,
}));

app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/projects', projectsRouter);
app.use('/api/auth', authRouter);
app.use('/api/contact', contactRouter);

app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({ error: err.message || 'Server error' });
});

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Startup failed', error);
    process.exit(1);
  }
}

startServer();

