import { StatsCard } from "./statsCard";
import { formatCurrency, formatPercentage } from '../../lib/utils/portfolioCalculations';
import { Holding } from "@/models/User";

export function PortfolioCards({ positions, closes }: { positions: Holding[], closes: number[] }) {
  const holdings = positions || [];
  const prevCloses = closes || [];
  const totalValue = holdings.reduce((acc, holding, index) => acc + holding.shares * prevCloses[index], 0);
  const totalIncrease = holdings.reduce((acc, holding, index) => acc + (holding.shares * prevCloses[index]) - (holding.shares * holding.averagePrice), 0);
  const percentageIncrease = (totalIncrease / totalValue) * 100;

  const isLoading = false; // may need to implement loading logic here

  const stats = {
    totalValue,
    totalIncrease,
    percentageIncrease,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatsCard
        title="Total Portfolio Value"
        value={formatCurrency(stats.totalValue)}
        isLoading={isLoading}
      />
      <StatsCard
        title="Total Increase"
        value={formatCurrency(stats.totalIncrease)}
        indicator={{
          value: formatPercentage(stats.percentageIncrease),
          positive: stats.percentageIncrease >= 0,
        }}
        isLoading={isLoading}
      />
    </div>
  );
}