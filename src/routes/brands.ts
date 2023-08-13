import express from 'express'

import { createBrand, getAllBrands, getBrand, updateBrand } from '../controllers/brands'

const router = express.Router()

router.get('/', getAllBrands)
router.get('/:id', getBrand)
router.post('/create', createBrand)
router.put('/update/:id', updateBrand)

export default router