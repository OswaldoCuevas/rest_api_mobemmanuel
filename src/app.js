import express from "express";
import tarjetasRoutes from './routes/tarjetas.routes.js';
import indexRoutes from './routes/index.routes.js';


const app = express();

app.use(express.json());

app.use("/api/ping", indexRoutes);
app.use("/api/tarjetas", tarjetasRoutes);
app.use((req,res,next) => {
    res.status(404).json({message:"endpoint not found"});
});
export default app;