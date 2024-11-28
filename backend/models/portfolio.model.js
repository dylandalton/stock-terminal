import mongoose from "mongoose";

const holdingSchema = mongoose.Schema({
  symbol: {
    type: String,
    required: true
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
  holdings: [holdingSchema]
}, {
  timestamps: true // createdAt, updatedAt
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;