export interface Position {
    symbol: string;
    shares: number;
    averagePrice: number;
    currentPrice: number;
    profitLoss: number;
    pnl: number;
}
  
export interface PortfolioStats {
    totalValue: number;
    totalIncrease: number;
    percentageIncrease: number;
}

export interface IPortfolio {
    positions: Position[];
}