import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '-',
    },
    description: {
      type: String,
      default: 'No Description available.',
    },
    logo: {
      type: String,
    },
    website: {
      type: String,
    },
    founding_year: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Brand = mongoose.model('Brand', brandSchema);
