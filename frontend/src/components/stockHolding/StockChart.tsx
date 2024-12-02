import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface StockChartProps {
  symbol: string
  companyName: string | undefined
  initialPrices: { date: string; price: number }[]
}

interface ChartData {
  date: string
  price: number
}

const timeRanges = ['1W', '1Y', '5Y'] as const
type TimeRange = typeof timeRanges[number]

export default function StockChart({ symbol, companyName, initialPrices }: StockChartProps) {
  const [prices, setPrices] = useState<ChartData[]>(initialPrices)
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1W')
  const [cache, setCache] = useState<Record<TimeRange, ChartData[]>>({
    '1W': initialPrices,
    '1Y': [],
    '5Y': []
  })

  const fetchPrices = async (range: TimeRange) => {
    if (cache[range].length > 0) {
      setPrices(cache[range])
      return
    }

    // Simulated API call
    const response = await fetch(`/api/prices?symbol=${symbol}&range=${range}`)
    const data = await response.json()
    setPrices(data)
    setCache(prevCache => ({ ...prevCache, [range]: data }))
  }

  useEffect(() => {
    fetchPrices(selectedRange)
  }, [selectedRange])

  const chartConfig = useMemo(() => ({
    price: {
      label: "Price",
      color: "hsl(var(--chart-1))",
    },
  }), [])

  const priceChange = useMemo(() => {
    if (prices.length < 2) return 0
    return prices[prices.length - 1].price - prices[0].price
  }, [prices])

  const maxPrice = useMemo(() => {
    return Math.max(...prices.map(p => p.price)) * 1.1 // 10% higher than max price
  }, [prices])

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
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={prices}>
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
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

