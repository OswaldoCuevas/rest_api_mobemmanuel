import { Router } from "express";
import jwt  from "jsonwebtoken";
import {  ensuresToken } from "../controllers/ensures_token.controller.js";

const router = new Router();

app.get('/api/protected', ensuresToken, (req, res) => {
    
})

export default router