import { PortfolioCards } from "@/components/portfolio/portfolioCards";
import Portfolio from '../components/portfolio/portfolio';
import { Holding } from "@/models/User";
import { useGetMultipleStockClosesQuery } from "@/services/PolygonApi";
import { AddModal } from "@/components/portfolio/AddModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";

const HomePage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const userId = selectedUser?._id;

  const holdings: Holding[] = selectedUser?.holdings ?? [];
  const symbols = holdings.map(holding => holding.symbol);

  const { data, isLoading, error } = useGetMultipleStockClosesQuery(symbols);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching stocks</div>;

  const prevCloses = data?.map((stockData) => stockData.results[0]?.c ?? 0) ?? [];

  return (
    <>
      <Button 
        className="w-full"
        variant="login"
        onClick={() => setShowAddModal(true)}
      >
        Add An Investment
      </Button>
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
          userId={userId}
        />
      )}
    </>
  )
}

export default HomePage
