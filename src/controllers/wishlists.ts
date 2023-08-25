import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Wishlist } from '../models/wishlists'

export const getAllWishlist = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId

  if (!userId)  {
    throw new Error('User ID is missing')
  }

  try {
    const wishlist = await Wishlist.findOne({ userId: userId }).populate('items.productId')
    res.status(200).json({ list: wishlist })
  } catch (error) {
    throw new Error(error)
  }
})

export const createWishlist = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId, productId } = req.body as { userId: string; productId: string }

  if (!userId || !productId)  {
    throw new Error('User ID or Product ID is missing')
  }

  try {
    const wishlistDetails = await Wishlist.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { items: { productId: productId } } },
      { upsert: true, new: true }
    ).populate('items.productId')

    res.status(200).json({ wishlistDetails: wishlistDetails })
  } catch (error) {
    throw new Error(error)
  }
})

export const updateWishlist = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params as { userId: string }
  const { items } = req.body as { items: string[] }

  if (!userId)  {
    throw new Error('User ID is missing')
  }

  if (items.length === 0) {
    throw new Error('Wishlist items are Empty')
  }

  try {
    const wishlistDetails = await Wishlist.findOneAndUpdate(
      { userId: userId },
      { items: items },
      { new: true }
    ).populate('items.productId')

    res.status(200).json({ wishlistDetails: wishlistDetails })
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteWishlist = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const { userId } = req.params as { userId: string }

  if (!userId)  {
    throw new Error('User ID is missing')
  }

  try {
    const wishlistDetails = await Wishlist.findOneAndDelete({ userId: userId })
    res.status(200).json({ wishlistDetails: wishlistDetails })
  } catch (error) {
    throw new Error(error)
  }
})
