import jwt, { Secret } from 'jsonwebtoken'

export const generateRefreshToken = (id: string) => {
  const secretKey: Secret | undefined = process.env.JWT_SECRET

  if (!secretKey) throw new Error('JWT_SECRET environment variable is missing')

  return jwt.sign({ id }, secretKey, { expiresIn: '3d' })
}