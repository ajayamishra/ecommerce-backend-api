import express from 'express'

import {
  deleteUser,
  disableUser,
  enableUser,
  getAllUser,
  getSingleUser,
  loginUser,
  registerUser,
  updateUser
} from '../controllers/users'
import { authenticationMiddleware, isAdmin } from '../middlewares/authentication'

const router = express.Router()

router.get('/api/v1/users', getAllUser)
router.get('/api/v1/users/:id', authenticationMiddleware, isAdmin, getSingleUser)
router.post('/api/v1/register', registerUser)
router.post('/api/v1/login', loginUser)
router.delete('/api/v1/users/:id', deleteUser)
router.put('/api/v1/update-user', authenticationMiddleware, updateUser)
router.put('/api/v1/block-user/:id', authenticationMiddleware, isAdmin, disableUser)
router.put('/api/v1/unblock-user/:id', authenticationMiddleware, isAdmin, enableUser)

export default router