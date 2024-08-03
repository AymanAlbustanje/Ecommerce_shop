import { Router } from "express";
import { createShop, getShopById, getAllShops } from "../controllers/ShopController";

const router = Router();

router.post("/", createShop);
router.get("/:id", getShopById);
router.get("/", getAllShops);

export default router;
