import { body, param } from 'express-validator'

export const createUpdateReviewValidationRules = [
  param('productId').isMongoId().withMessage('Invalid productId'),
  param('userId').isMongoId().withMessage('Invalid userId'),
  body('rating').isNumeric().isInt({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required'),
]