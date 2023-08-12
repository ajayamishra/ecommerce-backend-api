import mongoose from 'mongoose'

var categorySchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  tree: {
    type: Array,
    required: true
  },
  parent: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Category = mongoose.model('Category', categorySchema);