import express from 'express';
import { 
    createPortfolio, 
    deletePortfolio, 
    getPortfolios, 
    updatePortfolio, 
    getPortfolioHoldings, 
    getHolding,
    createHolding,
    updateHolding,
    deleteHolding,
    getScrape
} from '../controllers/portfolio.controller.js';

const router = express.Router();

router.get('/', getPortfolios);
router.post('/', createPortfolio);
router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

// Holdings endpoints
router.get('/:id/holdings', getPortfolioHoldings);
router.get('/:id/holdings/:symbol', getHolding);
router.post('/:id/holdings', createHolding);
router.put('/:id/holdings/:symbol', updateHolding);
router.delete('/:id/holdings/:symbol', deleteHolding);

// Web Scraping endpoint
router.post('/scrape', getScrape);

export default router;