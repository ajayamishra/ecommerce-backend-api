import { Request, Response } from 'express'

export const serverHealthCheck = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Server Healthy !!!' })
}