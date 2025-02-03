import express from 'express';
import userRoutes from './routes/user.route';

const app = express();

app.use('/api/users', userRoutes)

export default app;