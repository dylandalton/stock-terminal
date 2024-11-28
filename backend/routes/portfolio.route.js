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
    deleteHolding
} from '../controllers/portfolio.controller.js';

const router = express.Router();

router.get('/', getPortfolios);
router.post('/', createPortfolio);
router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

// Holdings endpoints
router.get('/:id/holdings', getPortfolioHoldings);
router.get('/:id/holdings/:holdingId', getHolding);
router.post('/:id/holdings', createHolding);
router.put('/:id/holdings/:holdingId', updateHolding);
router.delete('/:id/holdings/:holdingId', deleteHolding);

export default router;