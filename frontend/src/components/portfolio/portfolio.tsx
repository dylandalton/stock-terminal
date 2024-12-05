import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { calculateProfitLoss, formatCurrency, formatPercentage } from '../../lib/utils/portfolioCalculations';
import { Holding } from "@/models/User";
import { Trash2, CirclePlus, ListPlus } from 'lucide-react';
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { toggleAddHoldingModal } from "@/state/slices/addModalSlice";
import { toggleDeleteHoldingModal } from "@/state/slices/deleteModalSlice";
import { Link } from "react-router-dom";
import { setCurrentHolding } from "@/state/slices/currentHoldingSlice";
import { toggleModifyHoldingModal } from "@/state/slices/modifyModalSlice";

const Portfolio = ({ positions, closes }: { positions: Holding[], closes: number[]}) => {
  const dispatch = useDispatch();

    return (
        <>
        <Card>
          <Table>
            {(positions.length <= 2) ?
              <TableCaption>
                A list of your portfolio holdings
              </TableCaption>
              :
              <TableCaption>
                Note: Please wait a minute before adding a holding or Polygon.io won't process the request
              </TableCaption>
            }
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Symbol</TableHead>
                <TableHead>Shares</TableHead>
                <TableHead>Average Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Total Profit/Loss</TableHead>
                <TableHead>PNL %</TableHead>
                <TableHead>Buy/Sell</TableHead>
                <TableHead className="text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(positions.length > 0) ? positions.map( (holding: Holding, index) => (
                <TableRow key={holding.symbol}>
                  <TableCell className="font-medium cursor-pointer">
                    <Link 
                      to={`/holdings/${holding.symbol}`}
                      onClick={() => dispatch(setCurrentHolding({
                        symbol: holding.symbol,
                        companyName: holding.companyName
                      }))}
                    >
                      {holding.symbol}
                    </Link>
                  </TableCell>
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
                  <TableCell className="flex justify-center items-center">
                    <ListPlus className="text-black-500 hover:text-indigo-500 cursor-pointer" onClick={() => dispatch(toggleModifyHoldingModal(holding))}/>
                  </TableCell>
                  <TableCell>
                    <Trash2 className="text-red-500 hover:text-red-600 cursor-pointer" onClick={() => dispatch(toggleDeleteHoldingModal(holding.symbol))} />
                  </TableCell>
                </TableRow>
              )) : 
                <h2>You don't currently have any investments</h2>
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="text-centre" colSpan={8}>
                  <Button 
                    disabled={positions.length >= 5}
                    variant="login"
                    onClick={() => dispatch(toggleAddHoldingModal())}
                  >
                    <CirclePlus />
                    Add an Investment
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
        </>    
    );
}

export default Portfolio
