import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { usePortfolioStats } from "@/lib/hooks/usePortfolioStats";
import { calculateProfitLoss, formatCurrency, formatPercentage } from '../../lib/utils/portfolioCalculations';
import { Holding } from "@/models/User";

const Portfolio = ({ positions, closes }: { positions: Holding[], closes: number[]}) => {

  const { stats } = usePortfolioStats(positions);

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
              {positions.map( (holding, index) => (
                <TableRow key={holding.symbol}>
                  <TableCell className="font-medium">{holding.symbol}</TableCell>
                  <TableCell >{holding.shares}</TableCell>
                  <TableCell>{formatCurrency(holding.averagePrice)}</TableCell>
                  <TableCell>{formatCurrency(closes[index])}</TableCell>

                  {(() => {
                    const result = calculateProfitLoss(holding.averagePrice, holding.shares, closes[index], false);
                    return (
                      <TableCell>
                        {result.profitLoss !== undefined ? formatCurrency(result.profitLoss) : '-'}
                      </TableCell>);
                  })()}

                  {(() => {
                    const result = calculateProfitLoss(holding.averagePrice, holding.shares, closes[index], true);
                    return (
                      <TableCell className={`text-right px-2.5 py-0.5 rounded-full text-sm font-medium ${result.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(result?.percentage ?? 0)}
                      </TableCell>
                    );
                  })()}

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
