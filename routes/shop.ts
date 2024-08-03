import { Router } from "express";
import { createShop, getShopById, getAllShopsWithProducts } from "../controllers/ShopController";

const router = Router();

router.post("/", createShop);
router.get("/:id", getShopById);
router.get("/", getAllShopsWithProducts);

export default router;
