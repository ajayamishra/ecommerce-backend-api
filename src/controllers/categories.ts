import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { Category } from '../models/categories';
import { Product } from '../models/products';
import { validateMongoDbId } from '../utils/validateMongoDbId';

export const createCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.name || req.body.name === '') {
      throw new Error('Category Name is missing or Empty.');
    }
    const categoryDetails = await Category.create(req.body);
    res.status(201).json({ category: categoryDetails });
  } catch (error: any) {
    throw new Error(error);
  }
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string };

  if (!id) {
    throw new Error('Category Id is missing in the request.');
  }

  validateMongoDbId(id);

  try {
    /** Check if the category has associated products **/
    const productsCount = await Product.countDocuments({ category: id });

    if (productsCount > 0) {
      throw new Error('CCannot delete the category because it is associated with products.');
    }

    /** Check if the category has child categories **/
    const childCategories = await Category.find({ parent: id });

    if (childCategories.length > 0) {
      throw new Error('Cannot delete the category because it has child categories.');
    }

    const deletedCategory = await Category.findOneAndDelete({ _id: id });
    res.status(200).json({ data: deletedCategory });
  } catch (error: any) {
    throw new Error(error);
  }
});

export const getAllCategories = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryList = await Category.find();
    res.status(200).json({
      count: categoryList.length,
      list: categoryList,
    });
  } catch (error: any) {
    throw new Error(error);
  }
});

export const getCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string };

  if (!id) {
    throw new Error('Category Id is missing in the request.');
  }

  validateMongoDbId(id);

  try {
    const categoryDetails = await Category.findById(id);
    res.status(200).json({ data: categoryDetails });
  } catch (error: any) {
    throw new Error(error);
  }
});

export const updateCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string };

  if (!id) {
    throw new Error('Category Id is missing in the request.');
  }

  validateMongoDbId(id);

  try {
    const updatedCategory = await Category.findOneAndUpdate({ _id: id }, req.body, { new: true });
    res.status(200).json({ data: updatedCategory });
  } catch (error: any) {
    throw new Error(error);
  }
});
