import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2 } from 'lucide-react'
import { Financials } from '@/models/Polygon.model';
import { formatCurrency } from '@/lib/utils/portfolioCalculations';

interface KeyStatsProps {
  financials: Financials;
}

const StatItem: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-muted p-3 rounded-lg">
    <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default function KeyStatsCard({financials}: KeyStatsProps) {
  // financials['results'][0]['financials'] ensure the object passed as props is of Financials Type
  const grossProfit = formatCurrency(financials?.income_statement?.gross_profit?.value);
  const netIncomeLoss = formatCurrency(financials?.income_statement?.net_income_loss?.value);
  const operatingIncome = formatCurrency(financials?.income_statement.operating_income_loss?.value);
  const earningsPerShare = formatCurrency(financials?.income_statement.basic_earnings_per_share?.value);
  const sharesOutstanding = formatCurrency(financials?.income_statement.basic_average_shares?.value);
  const revenues = formatCurrency(financials?.income_statement.revenues?.value);
  const liabilities = formatCurrency(financials?.balance_sheet.liabilities?.value);
  const assets = formatCurrency(financials?.balance_sheet?.assets?.value);
  


  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <CardTitle className="text-2xl font-bold mr-2">Key Stats</CardTitle>
          <BarChart2 className="h-6 w-6" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatItem title="Gross Profit" value={grossProfit} />
          <StatItem title="Net Income" value={netIncomeLoss} />
          <StatItem title="Operating Income" value={operatingIncome} />
          <StatItem title="Revenues" value={revenues} />
          <StatItem title="Shares Outstanding" value={sharesOutstanding} />
          <StatItem title="Earnings Per Share" value={earningsPerShare} />
          <StatItem title="Liabilities" value={liabilities} />
          <StatItem title="Assets" value={assets} />
        </div>
      </CardContent>
    </Card>
  );
}

