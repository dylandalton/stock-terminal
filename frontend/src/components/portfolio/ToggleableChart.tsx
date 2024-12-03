import { useState, useMemo } from "react"
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, TooltipProps, XAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChartIcon as ChartPie, BarChartHorizontalBig } from 'lucide-react'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Holding } from "@/models/User"
import { formatCurrency } from '../../lib/utils/portfolioCalculations';

const CustomBarTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow">
        <p className="font-semibold">{formatCurrency(payload[0].payload.total)}</p>
      </div>
    );
  }
  return null;
};

interface HoldingTotal {
  symbol: string;
  total: number;
}

interface ToggleableChartProps {
  holdings: Holding[]
}

export default function ToggleableChart({ holdings }: ToggleableChartProps) {
  const [isPieChart, setIsPieChart] = useState(false)

  const positionTotals: HoldingTotal[] = holdings.map((holding) => ({
    symbol: holding.symbol,
    total: holding.shares * holding.averagePrice,
  }));

  const sortedTotals = useMemo(() => {
    return positionTotals.sort((a, b) => b.total - a.total);
  }, [positionTotals])

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  const chartConfig = useMemo(() => {
    return sortedTotals.reduce((acc, total, index) => {
      acc[total.symbol] = {
        label: total.symbol,
        color: colors[index % colors.length],
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>);
  }, [sortedTotals]);

  const toggleChart = () => setIsPieChart(!isPieChart)

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Holdings Chart</CardTitle>
        <Button variant="outline" size="icon" onClick={toggleChart}>
          {isPieChart ? (
            <BarChartHorizontalBig className="h-4 w-4" />
          ) : (
            <ChartPie className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
            {isPieChart ? (
              <PieChart>
                <Pie
                  data={sortedTotals}
                  dataKey="total"
                  nameKey="symbol"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                >
                  {sortedTotals.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<CustomBarTooltip />} />
                <ChartLegend content={<ChartLegendContent nameKey="symbol" />} />
              </PieChart>
            ) : (
              <BarChart data={sortedTotals}>
                <XAxis
                  dataKey="symbol"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                />
                <Bar dataKey="total">
                  {sortedTotals.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
                <ChartTooltip cursor={false} content={<CustomBarTooltip />} />
              </BarChart>
            )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

