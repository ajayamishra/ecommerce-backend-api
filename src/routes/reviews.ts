import express from 'express'

import {
  createReview,
  deleteReview,
  getAllReviewsByProductId,
  updateReview
} from '../controllers/reviews'

const router = express.Router()

router.get('/:productId', getAllReviewsByProductId)
router.post('/create', createReview)
router.put('/update/:id', updateReview)
router.delete('/delete/:id', deleteReview)

export default router