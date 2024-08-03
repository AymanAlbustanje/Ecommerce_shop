import { Request, Response, NextFunction } from "express";
import { Shop } from "../db/entities/Shop";
import { AppError } from "../errors/AppError";

export const createShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shopName, email, password } = req.body;
        if (!shopName || !email || !password) {
            throw new AppError('Missing required fields', 400, true);
        }

        const shop = new Shop();
        shop.shopName = shopName;
        shop.email = email;
        shop.password = password;

        await shop.save();
        res.status(201).json(shop);
    } catch (error) {
        next(error);
    }
};

export const getShopById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const shop = await Shop.findOne({ where: { id: parseInt(id) }, relations: ["products", "hotline"] });

        if (!shop) {
            throw new AppError('Shop not found', 404, true);
        }

        res.json(shop);
    } catch (error) {
        next(error);
    }
};

export const getAllShopsWithProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shops = await Shop.find({ relations: ["products"] });
        res.json(shops);
    } catch (error) {
        next(error);
    }
};
