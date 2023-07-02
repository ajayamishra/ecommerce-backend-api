import { NextFunction, Request, Response } from 'express'
import { User } from '../models/users'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import { UserDocument } from '../models/users'

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument | null;
    }
  }
}

export const authenticationMiddleware = asyncHandler(async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    const authorizationToken = req.headers.authorization.split(' ')[1]
    try {
      const jwtSecret: string = process.env.JWT_SECRET || ''
      const decodedUser: any = jwt.verify(authorizationToken, jwtSecret)

      const userDetails: UserDocument | null = await User.findById(decodedUser?.id)
      req.user = userDetails
      next()
    } catch (error: any) {
      throw new Error('Not Authorized. Token Expired. Please Login again.')
    }
  } else {
    throw new Error('Authorization Token Required.')
  }
})

export const isAdmin = asyncHandler(async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email }: any = req.user
  try {
    const userDetails: UserDocument | null = await User.findOne({ email })
    if (userDetails?.role !== 'admin') {
      throw new Error('Not a Admin User.')
    } else {
      next()
    }
  } catch (error: any) {
    throw new Error(error)
  }
})