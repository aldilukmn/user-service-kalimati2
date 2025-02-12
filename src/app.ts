import express from 'express';
import userRoutes from './routes/user.route';
import env from 'dotenv';
import cors from 'cors';
// import cookieParser from 'cookie-parser';

const app = express();
app.use(express.urlencoded({ extended: true })); //For Login body json, POST METHOD
env.config();
// app.use(cookieParser());
app.use(cors({
  origin: ['https://uptdsdn2kalimati.vercel.app'],
  credentials: true,
}))
app.use('/api/users', userRoutes)
// app.use((req, res, next) => {
//   res.on('finish', () => {
//     console.log(`Response Headers:`, res.getHeaders());
//   });
//   next();
// });

export default app;