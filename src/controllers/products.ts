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

export const getProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string }
  try {
    const productDetails = await Product.findById(id)
    res.status(200).json({ data: productDetails })
  } catch (error: any) {
    throw new Error(error)
  }
})

export const getAllProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const productList = await Product.find()
    res.status(200).json(
      {
        count: productList.length,
        list: productList
      }
    )
  } catch (error: any) {
    throw new Error(error)
  }
})