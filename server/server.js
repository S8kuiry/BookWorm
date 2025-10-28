

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';
import authRoutes from './routes/authRoutes.js';
import bookRouter from './routes/bookRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT ;  

app.use(cors());
app.use(express.json());

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