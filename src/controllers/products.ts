import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import slugify from 'slugify'

import { Product } from '../models/products'

export const createProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name)
    }
    const newProduct = await Product.create(req.body)
    res.status(200).json({ product: newProduct })
  } catch (error: any) {
    throw new Error(error)
  }
})

export const deleteProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string }
  if (!id) {
    throw new Error('Product Id is missing in the request.')
  }
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: id })
    res.status(200).json({ data: deletedProduct })
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

export const getProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string }
  try {
    const productDetails = await Product.findById(id)
    res.status(200).json({ data: productDetails })
  } catch (error: any) {
    throw new Error(error)
  }
})

export const updateProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string }
  if (!id) {
    throw new Error('Product Id is missing in the request.')
  }
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name)
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id }, req.body, { new: true }
    )
    res.status(200).json({ data: updatedProduct })
  } catch (error: any) {
    throw new Error(error)
  }
})