import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import portfolioRoutes from './routes/portfolio.route.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/portfolios", portfolioRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});