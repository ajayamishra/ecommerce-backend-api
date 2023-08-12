import express from 'express'

import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/products'
import { authenticationMiddleware, isAdmin } from '../middlewares/authentication'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.post('/create', authenticationMiddleware, isAdmin, createProduct)
router.put('/update/:id', authenticationMiddleware, isAdmin, updateProduct)
router.delete('/delete/:id', authenticationMiddleware, isAdmin, deleteProduct)

export default router
