import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '-'
  }
}, {
  timestamps: true
});

export const Brand = mongoose.model('Brand', brandSchema)
