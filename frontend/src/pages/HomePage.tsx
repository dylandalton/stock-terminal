import { PortfolioCards } from "@/components/portfolio/portfolioCards";
import Portfolio from '../components/portfolio/portfolio';
import { useSelector } from "react-redux";
import { Holding } from "@/models/User";
import { useGetStockCloseQuery } from "@/services/PolygonApi";

const HomePage = () => {
  const selectedUser = useSelector((state: any) => state.user.selectedUser);
  console.log("SelectedUser: ", selectedUser);

  const holdings: Holding[] = selectedUser?.holdings;
  console.log("Holdings: ", holdings);

  const queries = holdings.map((holding) => {
    return useGetStockCloseQuery(holding.symbol);
  });

  const prevCloses: number[] = [];

  queries.forEach((query) => {
    if (query?.data) {
      const [result] = query.data?.results;
      const prevClose = result?.c;
      prevCloses.push(prevClose);
    }
  });

  console.log("prevCloses: ", prevCloses);

  return (
    <>
      <PortfolioCards positions={holdings}/>
      <Portfolio positions={holdings} closes={prevCloses}/>
    </>
  )
}

export default HomePage
