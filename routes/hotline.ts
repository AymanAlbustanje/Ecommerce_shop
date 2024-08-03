import { Router } from "express";
import { createHotline, getAllHotlines, getHotlineById } from "../controllers/HotlineController";

const router = Router();

router.post("/", createHotline);
router.get("/", getAllHotlines);
router.get("/:id", getHotlineById);

export default router;
