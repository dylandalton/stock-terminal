import { StatsCard } from "./statsCard";
import { usePortfolioStats } from "@/lib/hooks/usePortfolioStats";
import { Position } from "@/lib/types/portfolio";
import { formatCurrency, formatPercentage } from '../../lib/utils/portfolioCalculations';

export interface PortfolioCardsProps {
  positions: Position[];
}

export function PortfolioCards({ positions }: PortfolioCardsProps) {
  const { stats, isLoading } = usePortfolioStats(positions);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatsCard
        title="Total Portfolio Value"
        value={formatCurrency(stats.totalValue)}
        indicator={{
          value: formatPercentage(stats.percentageIncrease),
          positive: stats.percentageIncrease >= 0,
        }}
        isLoading={isLoading}
      />
      <StatsCard
        title="Total Increase"
        value={formatCurrency(stats.totalIncrease)}
        isLoading={isLoading}
      />
    </div>
  );
}