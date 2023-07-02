import express from 'express'

import { serverHealthCheck } from '../controllers/health-check'

const router = express.Router()

router.get('/', serverHealthCheck)

export default router