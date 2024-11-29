import mongoose from "mongoose";

const holdingSchema = mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  companyName: {
    type: String
  },
  shares: {
    type: Number,
    required: true
  },
  averagePrice: {
    type: Number,
    required: true
  }
});

const portfolioSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  holdings: [holdingSchema],
  avatarUrl: {
    type: String,
    default: null
  }
}, {
  timestamps: true, // createdAt, updatedAt
  indexes: [{ fields: { 'holdings.symbol': 1 }, options: { unique: true } }]
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export {Portfolio as default};