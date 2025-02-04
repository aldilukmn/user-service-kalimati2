import express from 'express';
import userRoutes from './routes/user.route';
import env from 'dotenv';

const app = express();
env.config();
app.use('/api/users', userRoutes)

export default app;