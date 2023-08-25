import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt, { Secret } from 'jsonwebtoken'

import { User, UserDocument } from '../models/users'
import { LoginRequestBody } from '../types/users'
import { generateToken } from '../utils/jwtToken'
import { generateRefreshToken } from '../utils/refreshToken'
import { validateMongoDbId } from '../utils/validateMongoDbId'

export const getAllUser = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  try {
    const userList: UserDocument[] = await User.find()
    res.status(200).json({ list: userList })
    return
  } catch (error: any) {
    throw new Error(error)
  }
})

export const getSingleUser = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string }
  validateMongoDbId(id)

  try {
    const userDetails: UserDocument | null = await User.findById(id)
    res.status(200).json({ userDetails: userDetails })
    return
  } catch (error: any) {
    throw new Error(error)
  }
})

export const updateUser = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const { _id } = req.params as { _id: string }
  validateMongoDbId(_id)

  if (Object.keys(req.body).length === 0)  {
    throw new Error('Request Body is Missing.')
  }

  try {
    const userDetails: UserDocument | null = await User.findByIdAndUpdate(_id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        mobile: req?.body?.mobile
      }, {
        new: true
      }
    )
    res.status(200).json({ userDetails: userDetails })
    return
  } catch (error: any) {
    throw new Error(error)
  }
})

export const deleteUser = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const { id } = req.params as {id: string}
  validateMongoDbId(id)

  try {
    const userDetails: UserDocument | null = await User.findByIdAndDelete(id)
    res.status(200).json({ userDetails: userDetails })
    return
  } catch (error: any) {
    throw new Error(error)
  }
})

export const registerUser = asyncHandler(async(req: Request, res: Response): Promise<void> => {
    const email: string = req.body.email

    const findUser: UserDocument | null = await User.findOne({ email })
    if (!findUser) {
      try {
        const newUser = await User.create(req.body)
        res.status(200).json({ userDetails: newUser })
        return
      } catch (error: any) {
        throw new Error(error.toString())
      }
    } else {
      throw new Error('User Already Exists.')
    }
  }
)

export const loginUser = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const { email, password }: LoginRequestBody = req.body
  const userDetails: UserDocument | null = await User.findOne({ email })
  if (userDetails && (await userDetails.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(userDetails?.id)
    const updateUser = await User.findByIdAndUpdate(
      userDetails.id,
      { refreshToken: refreshToken },
      { new: true }
    )
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000
    })
    res.status(200).json({
      _id: updateUser?.id,
      firstName: updateUser?.firstname,
      lastName: updateUser?.lastname,
      email: updateUser?.email,
      mobile: updateUser?.mobile,
      token: generateToken(userDetails?._id)
    })
    return
  } else {
    throw new Error('Invalid User Credentials.')
  }
})

export const logoutUser = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const cookie = req.cookies
  if (!cookie?.refreshToken) {
    throw new Error('No Refresh Token in Cookies.')
  }
  const refreshToken = cookie.refreshToken
  const userDetails = await User.findOne({ refreshToken })
  if (!userDetails) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    })
    res.sendStatus(204)
  }

  await User.findOneAndUpdate({ refreshToken }, {
    refreshToken: ''
  })
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true
  })
  res.status(200).json({ message: 'Logout Successful.' })
})

export const disableUser = asyncHandler(async(req: Request, res: Response) : Promise<void> => {
  const { id } = req.params as {id: string}
  validateMongoDbId(id)

  try {
    const userDetails: UserDocument | null = await User.findByIdAndUpdate(
      id,
      { isDisabled: true },
      { new: true }
    )
    res.status(200).json(userDetails)
  } catch (error: any) {
    throw new Error(error)
  }
})

export const enableUser = asyncHandler(async(req: Request, res: Response) : Promise<void> => {
  const { id } = req.params as {id: string}
  validateMongoDbId(id)

  try {
    const userDetails: UserDocument | null = await User.findByIdAndUpdate(
      id,
      { isDisabled: false },
      { new: true }
    )
    res.status(200).json(userDetails)
  } catch (error: any) {
    throw new Error(error)
  }
})

export const handleRefreshToken = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const cookie = req.cookies

  if (!cookie?.refreshToken) {
    throw new Error('No Refresh Token in Cookies.')
  }
  const refreshToken = cookie.refreshToken
  const userDetails = await User.findOne({ refreshToken })
  if (!userDetails) {
    throw new Error('Refesh Token not available or attached.')
  }

  const secretKey: Secret | any = process.env.JWT_SECRET
  jwt.verify(refreshToken, secretKey, (error: any, decoded: any) => {
    if (error || userDetails.id !== decoded.id ) {
      throw new Error('Error in Refresh Token.')
    } else {
      const accessToken = generateToken(userDetails?.id)
      res.status(200).json({ accessToken })
    }
  })
})