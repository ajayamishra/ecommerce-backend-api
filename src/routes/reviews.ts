import express from 'express'

import {
  createReview,
  deleteReview,
  getAllReviewsByProductId,
  updateReview
} from '../controllers/reviews'
import { createUpdateReviewValidationRules } from '../utils/requestValidator'

const router = express.Router()

router.get('/:productId', getAllReviewsByProductId)
router.post('/create', createUpdateReviewValidationRules, createReview)
router.put('/update/:id', createUpdateReviewValidationRules, updateReview)
router.delete('/delete/:id', deleteReview)

export default router