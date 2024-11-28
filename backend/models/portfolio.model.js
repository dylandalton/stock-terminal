import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema({
    symbol:{
        type: String,
        required: true
    },
    companyName: {
        type: String,
    },
    shares: {
        type: Number,
        required: true
    },
    averagePrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // createdAt, updatedAt
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;