import express from 'express';
import userRoutes from './routes/user.route';
import env from 'dotenv';
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true })); //For Login body json, POST METHOD
env.config();
app.use(cors({
  credentials: true,
  origin: true,
}))
app.use('/api/users', userRoutes)

export default app;