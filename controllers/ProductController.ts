import { Request, Response, NextFunction } from "express";
import { Product } from "../db/entities/Product";
import { Shop } from "../db/entities/Shop";
import { AppError } from "../errors/AppError";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, shopId } = req.body;

        if (!name || typeof name !== 'string') {
            throw new AppError('Product name is required and must be a string', 400, true);
        }
        if (typeof price !== 'number') {
            throw new AppError('Price is required and must be a number', 400, true);
        }
        if (!shopId || isNaN(shopId)) {
            throw new AppError('Valid Shop ID is required', 400, true);
        }

        const shop = await Shop.findOneBy({ id: shopId });
        if (!shop) {
            throw new AppError('Shop not found', 404, true);
        }

        const product = new Product();
        product.name = name;
        product.price = price;
        product.shop = shop;

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};


export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ where: { id: parseInt(id) } });
        
        if (!product) {
            throw new AppError('Product not found', 404, true);
        }
        
        res.json(product);
    } catch (error) {
        next(error);
    }
};
