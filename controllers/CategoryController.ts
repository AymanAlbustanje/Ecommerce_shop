import { Request, Response, NextFunction } from "express";
import { Category } from "../db/entities/Category";
import { AppError } from "../errors/AppError";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw new AppError('Category name is required', 400, true);
        }

        const category = new Category();
        category.name = name;

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};
