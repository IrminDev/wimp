import config from './utils/config.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import adminRouter from './routers/admin.routes.js';
import scheduleRoutes from './routers/schedule.routes.js';
import teacherRoutes from './routers/teacher.routes.js';
import middleware from './utils/middleware.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use(middleware.tokenExtractor);

mongoose.set('strictQuery', false);

mongoose.connect(config.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
})

app.use('/api/admin', adminRouter);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/teacher', teacherRoutes);

export default app;