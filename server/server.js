

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';
import authRoutes from './routes/authRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import path from 'path'
dotenv.config();
const app = express();
const PORT = process.env.PORT ;  

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// db connection
connectDB()

app.get('/', (req, res) => {
  res.send('Welcome to the Book Mobile App Server!');
} 
 );

app.use('/api/auth',authRoutes);
app.use('/api/books',bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});