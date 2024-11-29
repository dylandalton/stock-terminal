import { useState, useEffect } from 'react';
import { PortfolioStats } from '@/lib/types/portfolio';
import { calculatePortfolioStats } from '@/lib/utils/portfolioCalculations';
import { Holding } from '@/models/User';

export function usePortfolioStats(positions: Holding[]): { 
  stats: PortfolioStats; 
  isLoading: boolean;
} {
  const [stats, setStats] = useState<PortfolioStats>({
    totalValue: 0,
    totalIncrease: 0,
    percentageIncrease: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a small delay to show loading state
    const calculateStats = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const calculatedStats = calculatePortfolioStats(positions);
      setStats(calculatedStats);
      setIsLoading(false);
    };

    calculateStats();
  }, [positions]);

  return { stats, isLoading };
}