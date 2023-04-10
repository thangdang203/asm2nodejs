import express from 'express';
import categoryRouter from './routers/category'
import productRouter from './routers/product'
import authRouter from './routers/auth'
import mongoose from 'mongoose';
const app = express();

//middlewares

app.use(express.json());

//router

app.use("/api", categoryRouter)
app.use("/api", productRouter)
app.use("/api", authRouter)
mongoose.connect('mongodb://localhost:27017/demo-we17302');
export const viteNodeApp = app; 