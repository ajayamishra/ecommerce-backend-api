import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import { Product } from '../models/products'

export const createProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(200).json({ product: newProduct })
  } catch (error: any) {
    throw new Error(error)
  }
})