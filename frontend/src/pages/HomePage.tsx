import { PortfolioCards } from "@/components/portfolio/portfolioCards";
import Portfolio from '../components/portfolio/portfolio';
import { useSelector } from "react-redux";
import { Holding } from "@/models/User";
import { useGetStockCloseQuery } from "@/services/PolygonApi";
import { AddModal } from "@/components/portfolio/AddModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const HomePage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const selectedUser = useSelector((state: any) => state.user.selectedUser);
  console.log("SelectedUser: ", selectedUser);

  const holdings: Holding[] = selectedUser?.holdings;
  console.log("Holdings: ", holdings);

  const queries = holdings.map((holding) => {
    return useGetStockCloseQuery(holding.symbol);
  });

  console.log("Queries: ", queries);

  const prevCloses: number[] = [];

  queries.forEach((query) => {
    try{
      if (query?.data) {
        const [result] = query.data?.results;
        const prevClose = result?.c;
        prevCloses.push(prevClose);
      }
    } catch (error) {
      console.error("Failed to find stock symbol: ", error);
    }
  });

  console.log("prevCloses: ", prevCloses);

  return (
    <>
      <PortfolioCards positions={holdings} closes={prevCloses}/>
      {(holdings.length > 0) ? 
        <Portfolio 
          positions={holdings} 
          closes={prevCloses}
        /> : 
        <Button 
          className="w-full"
          variant="login"
          onClick={() => setShowAddModal(true)}
        >
          Add An Investment
        </Button>
      }
      {showAddModal && (
        <AddModal 
          isOpen={showAddModal} 
          onClose={() => setShowAddModal(false)} 
        />
      )}
    </>
  )
}

export default HomePage
