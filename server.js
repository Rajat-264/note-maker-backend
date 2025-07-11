import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: ['https://note-maker-frontend.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

dotenv.config();
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);

app.get('/ping', (req, res) => res.send('pong'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
