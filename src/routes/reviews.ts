import express from 'express'

import {
  createReview,
  deleteReview,
  getAllReviewsByProductId,
  updateReview
} from '../controllers/reviews'
import { createReviewValidationRules } from '../utils/requestValidator'

const router = express.Router()

router.get('/:productId', getAllReviewsByProductId)
router.post('/create', createReviewValidationRules, createReview)
router.put('/update/:id', updateReview)
router.delete('/delete/:id', deleteReview)

export default router