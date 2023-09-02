import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

export const createReview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Review Created' })
})

export const deleteReview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Review Deleted' })
})

export const getAllReviewsByProductId = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ reviews: [] })
})

export const updateReview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Review Updated' })
})