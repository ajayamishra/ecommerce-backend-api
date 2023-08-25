import mongoose from 'mongoose'

var wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      }
    }
  ]
}, { timestamps: true }) 

export const Wishlist =  mongoose.model('Wishlist', wishlistSchema)
