import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import { Brand } from '../models/brands'
import { validateMongoDbId } from '../utils/validateMongoDbId'

export const createBrand = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.name || req.body.name === '') {
      throw new Error('Brand Name is missing or Empty.')
    }
    const brandDetails = await Brand.create(req.body)
    res.status(200).json({ brand: brandDetails })
  } catch (error: any) {
    throw new Error(error)
  }
})

export const deleteBrand = asyncHandler(async (req: Request, res: Response): Promise<void> => {

})

export const getAllBrands = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const brandList = await Brand.find()
    res.status(200).json(
      {
        count: brandList.length,
        list: brandList
      }
    )
  } catch(error: any) {
    throw new Error(error)
  }
})

export const getBrand = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string }
  try {
    const brandDetails = await Brand.findById(id)
    res.status(200).json({ data: brandDetails })
  } catch(error: any) {
    throw new Error(error)
  }
})

export const updateBrand = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string }
  if (!id) {
    throw new Error('Brand Id is missing in the request.')
  }
  try {
    const updatedBrand = await Brand.findOneAndUpdate(
      { _id: id }, req.body, { new: true }
    )
    res.status(200).json({ data: updatedBrand })
  } catch(error: any) {
    throw new Error(error)
  }
})
