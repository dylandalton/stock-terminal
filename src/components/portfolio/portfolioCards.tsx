import { StatsCard } from "./statsCard";
import { usePortfolioStats } from "@/lib/hooks/usePortfolioStats";
import { Position } from "@/lib/types/portfolio";

export interface PortfolioCardsProps {
  positions: Position[];
}

export function PortfolioCards({ positions }: PortfolioCardsProps) {
  const { stats, isLoading } = usePortfolioStats(positions);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  const formatPercentage = (value: number) =>
    `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;

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