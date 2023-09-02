import { Router } from 'express'

import appRoutes from './app'
import authRoutes from './auth'
import brandRoutes from './brands'
import categoryRoutes from './categories'
import productRoutes from './products'
import reviewRoutes from './reviews'
import wishlistRoutes from './wishlists'

const routes = [
  { path: '/', router: appRoutes },
  { path: '/api/v1/auth', router: authRoutes },
  { path: '/api/v1/brands', router: brandRoutes },
  { path: '/api/v1/categories', router: categoryRoutes },
  { path: '/api/v1/products', router: productRoutes },
  { path: '/api/v1/review', router: reviewRoutes },
  { path: '/api/v1/wishlist', router: wishlistRoutes },
]

export default (app: Router) => {
  routes.forEach((route) => {
    app.use(route.path, route.router)
  })
}