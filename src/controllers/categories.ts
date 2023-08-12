import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import { Category } from '../models/categories'
import { validateMongoDbId } from '../utils/validateMongoDbId'

export const createCategory = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.name || req.body.name === '') {
      throw new Error('Category Name is missing or Empty.')
    }
    const categoryDetails = await Category.create(req.body)
    res.status(200).json({ category: categoryDetails })
  } catch (error: any) {
    throw new Error(error)
  }
})

export const deleteCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {

})

export const getAllCategories = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryList = await Category.find()
    res.status(200).json(
      {
        count: categoryList.length,
        list: categoryList
      }
    )
  } catch(error: any) {
    throw new Error(error)
  }
})

export const getCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string }
  try {
    const categoryDetails = await Category.findById(id)
    res.status(200).json({ data: categoryDetails })
  } catch(error: any) {
    throw new Error(error)
  }
})

export const updateCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string }
  if (!id) {
    throw new Error('Category Id is missing in the request.')
  }
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id }, req.body, { new: true }
    )
    res.status(200).json({ data: updatedCategory })
  } catch(error: any) {
    throw new Error(error)
  }
})
