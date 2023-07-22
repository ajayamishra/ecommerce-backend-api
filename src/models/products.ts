import mongoose from 'mongoose'

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  },
  images: {
    type: Array
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  soldUnits: {
    type: Number,
    default: 0
  },
  ratings: [
    {
      star: Number,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ]
}, { timestamps: true })

export const Product =  mongoose.model('Product', productSchema)