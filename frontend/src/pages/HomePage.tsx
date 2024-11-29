import { PortfolioCards } from "@/components/portfolio/portfolioCards";
import { Position } from "@/lib/types/portfolio";
import Portfolio from '../components/portfolio/portfolio';
import { useSelector } from "react-redux";
import { Holding } from "@/models/User";

const positions: Position[] = [
  {
    symbol: "AAPL",
    shares: 100,
    averagePrice: 150.25,
    currentPrice: 175.50,
    profitLoss: 100.00,
    pnl: 12
  },
  {
    symbol: "MSFT",
    shares: 50,
    averagePrice: 285.50,
    currentPrice: 325.75,
    profitLoss: 220.50,
    pnl: 11.50
  },
  {
    symbol: "GOOGL",
    shares: 25,
    averagePrice: 125.30,
    currentPrice: 135.60,
    profitLoss: 95.50,
    pnl: 6.50
  },
];

const HomePage = () => {
  const selectedUser = useSelector((state: any) => state.user.selectedUser);
  console.log("SelectedUser: ", selectedUser);

  const holdings: Holding[] = selectedUser?.holdings;
  console.log("Holdings: ", holdings);

  return (
    <>
      <PortfolioCards positions={holdings}/>
      <Portfolio positions={holdings}/>
    </>
  )
}

export default HomePage
