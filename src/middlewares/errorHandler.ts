import { Request, Response, NextFunction } from 'express'

export const notFoundError = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const error = new Error(`Not Found: ${req.originalUrl}`)
  res.status(400)
  next(error)
}

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction): Promise<void> => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err?.message,
    stack: err?.stack
  })
}