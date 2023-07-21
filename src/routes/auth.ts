import express from 'express'

import {
  deleteUser,
  disableUser,
  enableUser,
  getAllUser,
  getSingleUser,
  handleRefreshToken,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../controllers/users'
import { authenticationMiddleware, isAdmin } from '../middlewares/authentication'

const router = express.Router()

router.get('/users', getAllUser)
router.get('/users/:id', authenticationMiddleware, isAdmin, getSingleUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.delete('/users/:id', deleteUser)
router.put('/update-user', authenticationMiddleware, updateUser)
router.put('/block-user/:id', authenticationMiddleware, isAdmin, disableUser)
router.put('/unblock-user/:id', authenticationMiddleware, isAdmin, enableUser)
router.get('/refresh', handleRefreshToken)

export default router