import express from 'express';
import { createPortfolio, deletePortfolio, getPortfolios, updatePortfolio } from '../controllers/portfolio.controller.js';

const router = express.Router();

router.get('/', getPortfolios);
router.post('/', createPortfolio);
router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

export default router;