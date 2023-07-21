import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import cookieParser from 'cookie-parser'

import config from './config/app'
import logging from './utils/logging'
import appRoutes from './routes/app'
import authRoutes from './routes/auth'
import { connectDB } from './db/connection'
import { errorHandler, notFoundError } from './middlewares/errorHandler'

const NAMESPACE = 'API Server'

const appServer = express()

appServer.use(bodyParser.json())
appServer.use(bodyParser.urlencoded({ extended: false }))
appServer.use(cookieParser())

/** Log the request */
appServer.use((req: Request, res: Response, next: NextFunction) => {
  /** Log the req */
  logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

  res.on('finish', () => {
    /** Log the res */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`)
  })
  next()
})

/** Error handling */
// appServer.use((req, res, next) => {
//   const error = new Error('API Endpoint not available')
//   res.status(404).json({  message: error.message })
// })

/** API Routes */
appServer.use('/', appRoutes)
appServer.use('/auth', authRoutes)

appServer.use(notFoundError)
appServer.use(errorHandler)
connectDB()

const httpServer = http.createServer(appServer)

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`))