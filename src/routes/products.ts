import express from 'express'

import { createProduct, getAllProducts, getProduct } from '../controllers/products'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.post('/create', createProduct)

export default router