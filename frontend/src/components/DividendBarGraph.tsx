import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

interface Dividend {
  date: string;
  label: string;
  adjDividend: number;
  dividend: number;
  recordDate: string;
  paymentDate: string;
  declarationDate: string;
  symbol: string;
}

interface DividendBarGraphProps {
  dividends: Dividend[];
}

const DividendBarGraph: React.FC<DividendBarGraphProps> = ({ dividends }) => {
  const currentDate = new Date();
  const threeMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
  const threeMonthsFromNow = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 0);

  const filteredDividends = dividends.filter(div => {
    const divDate = new Date(div.date);
    return divDate >= threeMonthsAgo && divDate <= threeMonthsFromNow;
  });

  const aggregatedData = filteredDividends.reduce((acc, div) => {
    const date = new Date(div.date);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    if (!acc[key]) {
      acc[key] = { month: key, totalDividend: 0, isPast: date < currentDate };
    }
    acc[key].totalDividend += div.dividend;
    return acc;
  }, {} as Record<string, { month: string; totalDividend: number; isPast: boolean }>);

  const chartData = Object.values(aggregatedData).sort((a, b) => {
    const [aMonth, aYear] = a.month.split(' ');
    const [bMonth, bYear] = b.month.split(' ');
    return new Date(`${aMonth} 1, ${aYear}`).getTime() - new Date(`${bMonth} 1, ${bYear}`).getTime();
  }).map(data => ({
    ...data,
    fill: data.isPast ? "var(--color-pastDividend)" : "var(--color-futureDividend)"
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border p-2 rounded shadow-md">
          <p className="font-semibold">{label}</p>
          <p className="text-primary">
            Total Dividend: ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dividend Income (Last 3 Months & Next 3 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            pastDividend: {
              label: "Past Dividend",
              color: "hsl(var(--chart-1))",
            },
            futureDividend: {
              label: "Future Dividend",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <ChartTooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="totalDividend" 
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DividendBarGraph;

