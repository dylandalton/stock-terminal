import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PortfolioCardsProps } from "./portfolioCards"
import { usePortfolioStats } from "@/lib/hooks/usePortfolioStats";

const Portfolio = ({ positions }: PortfolioCardsProps) => {
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
              {positions.map( (holding) => (
                <TableRow key={holding.symbol}>
                  <TableCell className="font-medium">{holding.symbol}</TableCell>
                  <TableCell >{holding.shares}</TableCell>
                  <TableCell>${holding.averagePrice}</TableCell>
                  <TableCell>${holding.currentPrice}</TableCell>
                  <TableCell>${holding.profitLoss}</TableCell>
                  <TableCell className="text-right">{holding.pnl}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="text-left" colSpan={5}>Total Value</TableCell>
                <TableCell className="text-right">${stats.totalValue}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
        </>    
    );
}

export default Portfolio
