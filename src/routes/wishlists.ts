import express from 'express'

import { createWishlist, deleteWishlist, getAllWishlist, updateWishlist } from '../controllers/wishlists'

const router = express.Router()

router.get('/', getAllWishlist)
router.post('/create', createWishlist)
router.put('/update/:id', updateWishlist)
router.delete('/delete/:id', deleteWishlist)

export default router