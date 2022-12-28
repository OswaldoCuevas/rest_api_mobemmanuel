import { Router } from "express";
import { getTargeta, getTargetas, addTargeta, updateTargeta, deleteTargeta} from "../controllers/tarjetas.controller.js";
const router = new Router();

router.get("/:id", getTargeta)

router.get("/", getTargetas)

router.post("/", addTargeta)

router.patch("/:id", updateTargeta)

router.delete("/:id", deleteTargeta)

export default router