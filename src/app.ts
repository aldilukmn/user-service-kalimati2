import express from 'express';
import userRoutes from './routes/user.route';
import env from 'dotenv';

const app = express();
app.use(express.urlencoded({ extended: true })); //For Login body json, POST METHOD
env.config();
app.use('/api/users', userRoutes)

export default app;