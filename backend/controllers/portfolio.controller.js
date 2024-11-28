import Portfolio from "../models/portfolio.model.js";
import mongoose from "mongoose";
import { validatePortfolio, validateHolding } from "../utils/portfolioValidation.util.js";

export const getPortfolios = async (req, res) => {
    try{
        const portfolios = await Portfolio.find({});
        res.status(200).json({success: true, data: portfolios})
    } catch (error) {
        console.error('failed to fetch portfolios: ', error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

export const createPortfolio = async (req, res) => {
    const portfolio = req.body;

    if(!portfolio?.holdings || !portfolio?.user){
      return res.status(400).json({
        success: false, 
        message: "Please fill in required fields"
      });
    }

    const newPortfolio = new Portfolio(portfolio);

    try {
      await newPortfolio.save();
      res.status(201).json({success: true, data: newPortfolio});
    } catch (error) {
      console.error('failed to fetch data: ', error);
      res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

export const updatePortfolio = async (req, res) => {
    const {id} = req.params;
    const portfolio = req.body;
  
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({success: false, message: "Portfolio not found"});
    }
  
    try{
      const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, portfolio, {new: true});
      res.status(200).json({success: true, data: updatedPortfolio})
    } catch (error) {
      console.error('failed to fetch portfolios: ', error);
      res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

export const deletePortfolio = async (req, res) => {
    const {id} = req.params;
    
    try {
      await Portfolio.findByIdAndDelete(id);
      res.status(200).json({success: true, message: "Deleted Portfolio"});
    } catch (error) {
      console.error('failed to fetch data: ', error);
      res.status(404).json({success: false, message: "Portfolio not found"});
    }
  
};

export const getPortfolioHoldings = async (req, res) => {
  try{
    const {id} = req.params;
    const portfolio = await validatePortfolio(Portfolio, id);
    res.status(200).json({ success: true, data: portfolio.holdings });
  } catch (error) {
    console.error('failed to fetch holdings: ', error);
    res.status(500).json({success: false, message: "Internal Server Error"});
  }
};

export const getHolding = async (req, res) => {
  try {
    const { id, holdingId } = req.params;
    const portfolio = await validatePortfolio(Portfolio, id);
    const holding = await validateHolding(portfolio, holdingId);
    res.status(200).json({ success: true, data: holding });
  } catch (error) {
    console.error('Failed to fetch holding: ', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const createHolding = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await validatePortfolio(Portfolio, id);
    const holding = req.body;

    const requiredFields = ['symbol', 'shares', 'averagePrice'];
    const missingFields = requiredFields.filter((field) => !holding[field]);

    if (missingFields.length > 0) {
      res.status(400).json({ success: false, message: 'Please provide all required fields' });
    } else {
      portfolio.holdings.push(holding);
      portfolio.markModified('holdings');
      await portfolio.save();

      res.status(201).json({ success: true, message: 'Holding created successfully', data: holding });
    }
  } catch (error) {
    console.error('Failed to create holding: ', error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Internal Server Error' });
  }
};

export const updateHolding = async (req, res) => {
  try {
    const { id, holdingId } = req.params;
    const portfolio = await validatePortfolio(Portfolio, id);
    const updates = req.body;

    const holding = portfolio.holdings.id(holdingId);

    Object.keys(updates).forEach((key) => {
      console.log("Holding", holding);
      holding[key] = updates[key];
    });

    portfolio.markModified('holdings');
    await portfolio.save();

    res.status(200).json({ success: true, message: 'Holding updated successfully', data: holding });
  } catch (error) {
    console.error('Failed to update holding: ', error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Internal Server Error' });
  }
};

export const deleteHolding = async (req, res) => {
  try {
    const { id, holdingId } = req.params;
    const portfolio = await validatePortfolio(Portfolio, id);
    await validateHolding(portfolio, holdingId);

    portfolio.holdings.pull(holdingId);
    portfolio.markModified('holdings');
    await portfolio.save();

    res.status(200).json({ success: true, message: 'Holding deleted successfully' });
  } catch (error) {
    console.error('Failed to delete holding: ', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};