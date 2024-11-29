import { Holding } from '@/models/User';
import { PortfolioStats } from '../types/portfolio';

export function calculatePortfolioStats(positions: Holding[]): PortfolioStats {
  const currentPrice = 150; // Hardcoded current price
  const totalValue = positions.reduce(
    (sum, holding) => sum + holding.shares * currentPrice,
    0
  );

  const totalCost = positions.reduce(
    (sum, holding) => sum + holding.shares * holding.averagePrice,
    0
  );

  const totalIncrease = totalValue - totalCost;
  const percentageIncrease = (totalIncrease / totalCost) * 100;

  return {
    totalValue,
    totalIncrease,
    percentageIncrease,
  };
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

export const formatPercentage = (value: number) =>
  `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;