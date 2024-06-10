import express, { Express } from "express";
import userRoutes from './routes/userRoutes.js';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
// import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3030;

// app.use(cors());
app.use(express.json());

const mongoUri: string = process.env.MONGO_URI as string;
mongoose.connect(mongoUri, {dbName: 'testDb'})
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err));

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});