import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { usePortfolioStats } from "@/lib/hooks/usePortfolioStats";
import { formatCurrency, formatPercentage } from '../../lib/utils/portfolioCalculations';
import { Holding } from "@/models/User";

const Portfolio = ({ positions }: { positions: Holding[]}) => {
  const { stats } = usePortfolioStats(positions);
  const currentPrice = 150; // Hardcoded current price

    return (
        <>
        <Card>
          <Table>
            <TableCaption>A list of your portfolio holdings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Symbol</TableHead>
                <TableHead>Shares</TableHead>
                <TableHead>Average Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Total Profit/Loss</TableHead>
                <TableHead className="text-right">PNL %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map( (holding) => (
                <TableRow key={holding.symbol}>
                  <TableCell className="font-medium">{holding.symbol}</TableCell>
                  <TableCell >{holding.shares}</TableCell>
                  <TableCell>{formatCurrency(holding.averagePrice)}</TableCell>
                  <TableCell>{formatCurrency(currentPrice)}</TableCell>
                  <TableCell>{formatCurrency(1500)}</TableCell>
                  <TableCell className="text-right">{formatPercentage(25)}</TableCell>
                  {/* <TableCell>{formatCurrency(holding.currentPrice)}</TableCell>   Currently hardcoded, fetch from API
                  <TableCell>{formatCurrency(holding.profitLoss)}</TableCell>   Implement function to calculate
                  <TableCell className="text-right">{formatPercentage(holding.pnl)}</TableCell>    Implement function to calculate*/}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="text-left" colSpan={5}>Total Value</TableCell>
                <TableCell className="text-right">{formatCurrency(stats.totalValue)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
        </>    
    );
}

export default Portfolio
