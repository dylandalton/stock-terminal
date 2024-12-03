import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useAppSelector } from '@/lib/hooks/typedHooks'
import { useGetStockPastFiveYearsHistoryQuery, useGetStockPastYearHistoryQuery } from '@/services/AlphaVantageApi'

interface StockChartProps {
  symbol: string
  companyName: string | undefined
  initialPrices: { [key: string]: string }
}

interface ChartData {
  date: string
  price: string
}

const timeRanges = ['1W', '1Y', '5Y'] as const
type TimeRange = typeof timeRanges[number]

export default function StockChart({ symbol, companyName, initialPrices }: StockChartProps) {
  const currentHolding = useAppSelector((state) => state.currentHolding);
  // Convert initialPrices to an array of ChartData for useState
  const [prices, setPrices] = useState<ChartData[]>(Object.entries(initialPrices).map(([date, price]) => ({
    date,
    price
  })));
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1W')
  const [cache, setCache] = useState<Record<TimeRange, ChartData[]>>({
    '1W': Object.entries(initialPrices).map(([date, price]) => ({
      date,
      price
    })),
    '1Y': [],
    '5Y': []
  });

  const pastYearPrices = useGetStockPastYearHistoryQuery(currentHolding.symbol, {
    skip: selectedRange !== "1Y" // Only fetch when user selects 1Y
  });

  const fiveYearPrices = useGetStockPastFiveYearsHistoryQuery(currentHolding.symbol, {
    skip: selectedRange !== "5Y" // Only fetch when user selects 5Y
  });

  useEffect(() => {
    if(selectedRange === "1W"){
      setPrices(Object.entries(initialPrices).map(([date, price]) => ({
        date,
        price,
      })));
    } else if(
      selectedRange === "1Y" && 
      pastYearPrices.data && 
      !pastYearPrices.isLoading && 
      pastYearPrices.data?.['Weekly Adjusted Time Series']
    ){
      const pastPrices = Object.fromEntries(
        Object.entries(pastYearPrices.data?.['Weekly Adjusted Time Series'] ?? {}).slice(0, 7)
      );
      const pastYearCloses = Object.fromEntries(
        Object.entries(pastPrices).map(([date, priceData]) => [
          date,
          parseFloat((priceData as any)['4. close']).toFixed(2),
        ])
      );
  
      const chartData: ChartData[] = Object.entries(pastYearCloses).map(([date, price]) => ({
        date,
        price
      }));
  
      setPrices(chartData);
      setCache(prevCache => ({ ...prevCache, '1Y': chartData }));
    } else if(
      selectedRange === "5Y" && 
      fiveYearPrices.data && 
      !fiveYearPrices.isLoading && 
      fiveYearPrices.data?.['Monthly Adjusted Time Series']
    ){
      const pastPrices = Object.fromEntries(
        Object.entries(fiveYearPrices.data?.['Monthly Adjusted Time Series'] ?? {}).slice(0, 7)
      );
      const pastYearCloses = Object.fromEntries(
        Object.entries(pastPrices).map(([date, priceData]) => [
          date,
          parseFloat((priceData as any)['4. close']).toFixed(2),
        ])
      );
  
      const chartData: ChartData[] = Object.entries(pastYearCloses).map(([date, price]) => ({
        date,
        price
      }));
  
      setPrices(chartData);
      setCache(prevCache => ({ ...prevCache, '5Y': chartData }));
    }
  }, [selectedRange, pastYearPrices.data, pastYearPrices.isLoading, fiveYearPrices.data, fiveYearPrices.isLoading]);

  const chartConfig = useMemo(() => ({
    price: {
      label: "Price",
      color: "#333",
    },
  }), []);

  const priceChange = useMemo(() => {
    if (prices.length < 2) return 0;
    return Number(prices[prices.length - 1].price) - Number(prices[0].price);
  }, [prices]);

  const maxPrice = useMemo(() => {
    return Math.max(...prices.map(p => Number(p.price))) * 1.1; // 10% higher than max price
  }, [prices]);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-3xl font-bold">{symbol}</CardTitle>
          <p className="text-xl text-muted-foreground">{companyName}</p>
        </div>
        <Card className={`p-4 ${priceChange >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
          <CardTitle className={`text-2xl ${priceChange >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
          </CardTitle>
        </Card>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end space-x-2 mb-4">
          {timeRanges.map(range => (
            <Button
              key={range}
              variant={selectedRange === range ? "default" : "outline"}
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
        <ChartContainer config={chartConfig} className="h-[400px]">
            <AreaChart data={prices} width={711} height={400}>
              <XAxis 
                dataKey="date" 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                domain={[prices[0]?.price || 0, maxPrice]}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="var(--color-price)" 
                fill="var(--color-price)" 
                fillOpacity={0.2} 
              />
            </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

