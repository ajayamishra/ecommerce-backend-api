import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import { Review } from '../models/reviews'
import { validateMongoDbId } from '../utils/validateMongoDbId'

export const createReview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Review Created' })
})

export const deleteReview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Review Deleted' })
})

export const getAllReviewsByProductId = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { limit = '10', page = '1', productId, sortBy = 'timestamp', sortOrder = 'desc' } = req.params

  if (productId === undefined || productId === '') {
    throw new Error('Product ID is missing in the request')
  }

  validateMongoDbId(productId)

  try {
    const sortFieldName = sortBy || 'timestamp'
    const sortingOrder = sortOrder || 'desc'

    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const sort: { [key: string]: 'asc' | 'desc' } = {}
    sort[sortFieldName] = sortingOrder as 'asc' | 'desc'
    
    const totalReviewsCount = await Review.countDocuments({ productId: productId });
    const productReviews = await Review.find({ productId: productId })
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sort)
      .exec()

      res.status(200).json({
        count: totalReviewsCount,
        reviews: productReviews
      })
  } catch (error: any) {
    throw new Error(error)
  }
})

export const updateReview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Review Updated' })
})
