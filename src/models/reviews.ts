import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  comments: {
    type: String,
    required: true
  },
  helpfulVotes: {
    type: Number,
    default: 0
  },
  abuseReports: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      reason: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Action Taken', 'Resolved'],
        default: 'Pending'
      },
      comments: {
        type: String
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  timestamp: {
    type: Date,
    default: Date.now
  }
  
}, { timestamps: true }) 

export const Review =  mongoose.model('Review', reviewSchema)
