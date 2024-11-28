import { Position, PortfolioStats } from '../types/portfolio';

export function calculatePortfolioStats(positions: Position[]): PortfolioStats {
  const totalValue = positions.reduce(
    (sum, position) => sum + position.shares * position.currentPrice,
    0
  );

  const totalCost = positions.reduce(
    (sum, position) => sum + position.shares * position.averagePrice,
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