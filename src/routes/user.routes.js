import { Router } from "express";
import { addManager } from "../controllers/user.controller.js"

const router = new Router();

router.post("/",  addManager)

export default router