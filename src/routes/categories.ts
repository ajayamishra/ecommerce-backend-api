import express from 'express'

import { createCategory, getAllCategories, getCategory, updateCategory } from '../controllers/categories'

const router = express.Router()

router.get('/', getAllCategories)
router.get('/:id', getCategory)
router.post('/create', createCategory)
router.put('/update/:id', updateCategory)

export default router
