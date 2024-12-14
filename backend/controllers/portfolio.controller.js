import Portfolio from "../models/portfolio.model.js";
import mongoose from "mongoose";
import { validatePortfolio, validateHolding } from "../utils/portfolioValidation.util.js";
import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import { extract } from 'article-parser';

export const getPortfolios = async (req, res) => {
    try{
        const portfolios = await Portfolio.find({});
        res.status(200).json({success: true, data: portfolios})
    } catch (error) {
        console.error('failed to fetch portfolios: ', error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

export const testEndpoint = async (req, res) => {
  const {symbol} = req.params;
  const words = `Here: ${symbol}`
  res.status(200).json({success: true, data: words})
}

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
    const { id, symbol } = req.params;
    const portfolio = await validatePortfolio(Portfolio, id);
    const holding = await validateHolding(portfolio, symbol);
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
    const { id, symbol } = req.params;
    const portfolio = await validatePortfolio(Portfolio, id);
    const updates = req.body;

    const holding = portfolio.holdings.find(h => h.symbol === symbol);

    if (!holding) {
      throw {
        status: 404,
        message: 'Holding not found',
      };
    }

    Object.keys(updates).forEach((key) => {
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
    const { id, symbol } = req.params;
    const portfolio = await validatePortfolio(Portfolio, id);

    const holdingIndex = portfolio.holdings.findIndex(h => h.symbol === symbol);

    if (holdingIndex === -1) {
      throw {
        status: 404,
        message: 'Holding not found',
      };
    }

    portfolio.holdings.splice(holdingIndex, 1);
    portfolio.markModified('holdings');
    await portfolio.save();

    res.status(200).json({ success: true, message: 'Holding deleted successfully' });
  } catch (error) {
    console.error('Failed to delete holding: ', error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Internal Server Error' });
  }
};

// Scraper for CNBC articles (title, author & text)
export const getScrape = async (req, res) => {
  const {articleUrl} = req.params;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(articleUrl, { 
    waitUntil: 'networkidle0',
    timeout: 50000 
  });

  await page.waitForSelector('.ArticleHeader-headline', { timeout: 30000 });
  const articleTitle = await page.evaluate(() => {
    const title = document.querySelector('.ArticleHeader-headline');
    return title ? title.innerText : 'No Title Found';
  });
  console.log("Title: ", articleTitle);

  const authorName = await page.evaluate(() => {
    const author = document.querySelector('.Author-authorName');
    return author ? author.innerText : 'No Author Found';
  });
  console.log("Author: ", authorName);

  // Fetch article text from all <p> tags inside divs with class "group"
  const articleText = await page.evaluate(() => {
    const groups = document.querySelectorAll('div.group');
    
    // Gather text from all <p> tags inside these groups
    let textContent = '';
    groups.forEach(group => {
      const paragraphs = group.querySelectorAll('p');
      paragraphs.forEach(p => {
        textContent += p.innerText + '\n\n'; // Add each paragraph's text followed by two line breaks for readability
      });
    });
    // Trim any leading or trailing whitespace
    return textContent.trim() || 'No Article Text Found';
  });
  console.log("Article Text: ", articleText);
  await browser.close();
  const response = {
    title: articleTitle,
    author: authorName,
    articleText: articleText,
    article_url: articleUrl
  };
  res.status(200).json(response);
};

export const scrapeArticles = async (req, res) => {
  const {symbol} = req.params;
  const url = `https://www.cnbc.com/quotes/${symbol}`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { 
    waitUntil: 'networkidle0',
    timeout: 120000 
  });

  const allArticles = await page.evaluate(() => {
    const articles = document.querySelectorAll('.LatestNews-item');
    return Array.from(articles).slice(0, 3).map((article) => {
      const container = article.querySelector('.LatestNews-container');
      const headline = container.querySelector('.LatestNews-headlineWrapper');
      const aTag = headline.querySelector('a');
      const title = aTag ? aTag.title : 'No Title Available';
      const url = aTag ? aTag.href : undefined;

      // Querying for the author inside the nested spans
      const sourceSpan = headline.querySelector('span');
      const innerSpan = sourceSpan.querySelector('span');
      
      let author = '';
      if (innerSpan) {
        // Get the computed style for ::before
        const beforeStyle = window.getComputedStyle(innerSpan, '::before');
        const beforeContent = beforeStyle.content;

        // Extract text content, removing quotes
        const spanText = innerSpan.textContent.trim();

        // Combine before content and span text
        if (beforeContent && beforeContent !== 'none') {
          author = beforeContent.replace(/^["']|["']$/g, '').trim()
            .replace(/^-\s*/, '') + 
            (spanText ? spanText : ''); // Remove the space before spanText
        } else {
          author = spanText.replace(/^-\s*/, '');
        }
      }
      // Skip articles with empty title
      if (title === ' ') {
        return null;
      }

      return { title, url, author };
    }).filter(article => article !== null); // Filter out null entries
  });
  await browser.close();
  res.status(200).json(allArticles);
  // return allArticles;
}
