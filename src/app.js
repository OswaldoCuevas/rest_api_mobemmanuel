import express from "express";
import paymentLogsRoutes from "./routes/payment_logs.routes.js";
import paymentsRoutes from "./routes/payments.routes.js";
import paymentsByDate from "./routes/payments_by_date.routes.js";
import indexRoutes from './routes/index.routes.js';
import loginRoutes from './routes/login.routes.js';
import userRoutes from './routes/user.routes.js'
import cors from 'cors';
import { ensuresToken } from "./ensure_token.js";


const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/login",loginRoutes)

app.use("/api/user",userRoutes)

app.use("/api/ping", ensuresToken ,indexRoutes);

app.use("/api/payment_logs", paymentLogsRoutes);

app.use("/api/payments", paymentsRoutes);

app.use("/api",ensuresToken , paymentsByDate);

app.use((req,res,next) => {
    res.status(404).json({message:"endpoint not found"});
});
export default app;