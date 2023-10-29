import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        originalPrice: {
          type: Number,
          required: true,
        },
        currentPrice: {
          type: Number,
          required: true,
        },
        customName: {
          type: String,
        },
        productUrl: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Wishlist = mongoose.model('Wishlist', wishlistSchema);
