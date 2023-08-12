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
  images: {
    type: Array
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  attributes: {
    size: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Color'
    }
  },
  inventory: {
    soldUnits: {
      type: Number,
      default: 0,
      select: false
    },
    quantity: {
      type: Number,
      required: true,
    }
  },
  manufacture_details: {
    name: {
      type: String,
      default: '-'
    },
    modelNumber: {
      type: Date,
      default: '-'
    },
    releaseDate: {
      type: Date,
      default: Date.now
    }
  },
  shippingDetails: {
    weight: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    depth: {
      type: Number,
      default: 0
    }
  },
  ratings: [
    {
      star: Number,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ]
}, { timestamps: true }) 

export const Product =  mongoose.model('Product', productSchema)