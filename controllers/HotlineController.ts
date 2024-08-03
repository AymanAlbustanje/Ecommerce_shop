import { Request, Response, NextFunction } from "express";
import { Hotline } from "../db/entities/Hotline";
import { Shop } from "../db/entities/Shop";
import { AppError } from "../errors/AppError";

export const createHotline = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { hotlineNumber, shopId } = req.body;

        if (!hotlineNumber || typeof hotlineNumber !== 'string') {
            throw new AppError('Hotline number is required and must be a string', 400, true);
        }
        if (!shopId || isNaN(shopId)) {
            throw new AppError('Valid Shop ID is required', 400, true);
        }

        const shop = await Shop.findOneBy({ id: shopId });
        if (!shop) {
            throw new AppError('Shop not found', 404, true);
        }

        const hotline = new Hotline();
        hotline.hotlineNumber = hotlineNumber;
        hotline.shop = shop;

        await hotline.save();
        res.status(201).json(hotline);
    } catch (error) {
        console.error('Error creating hotline:', error);
        next(error);
    }
};


export const getAllHotlines = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotlines = await Hotline.find({ relations: ["shop"] });
        res.json(hotlines);
    } catch (error) {
        next(error);
    }
};

export const getHotlineById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const hotline = await Hotline.findOne({ where: { id: parseInt(id) }, relations: ["shop"] });

        if (!hotline) {
            throw new AppError('Hotline not found', 404, true);
        }

        res.json(hotline);
    } catch (error) {
        next(error);
    }
};
