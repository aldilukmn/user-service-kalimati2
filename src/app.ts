import express from 'express';
import userRoutes from './routes/user.route';
import env from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.urlencoded({ extended: true })); //For Login body json, POST METHOD
env.config();
app.use(cookieParser());
app.use(cors({
  origin: [`${process.env.FE_URL}`, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Response Headers:', res.getHeaders());
  });
  next();
});
app.use('/api/users', userRoutes);
export default app;