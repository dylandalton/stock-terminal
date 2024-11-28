import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Portfolio from './models/portfolio.model.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(express.json()); // Allows us to accept json data in request body
// Runs before you send a response back to the client

app.get('/api/portfolios', async (req, res) => {
  try{
    const portfolios = await Portfolio.find({});
    res.status(200).json({success: true, data: portfolios})
  } catch (error) {
    console.error('failed to fetch portfolios: ', error);
    res.status(500).json({success: false, message: "Internal Server Error"});
  }
});

app.post('/api/portfolios', async (req, res) => {
    const portfolio = req.body; // User request body

    if(!portfolio?.symbol || !portfolio?.shares || !portfolio?.averagePrice){
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
  });

app.put('/api/portfolios/:id', async (req, res) => {
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
});

app.delete('/api/portfolios/:id', async (req, res) => {
  const {id} = req.params;
  
  try {
    await Portfolio.findByIdAndDelete(id);
    res.status(200).json({success: true, message: "Deleted Portfolio"});
  } catch (error) {
    console.error('failed to fetch data: ', error);
    res.status(404).json({success: false, message: "Portfolio not found"});
  }

});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});