import { PortfolioCards } from "@/components/portfolio/portfolioCards";
import Portfolio from '../components/portfolio/portfolio';
import { useSelector } from "react-redux";
import { Holding } from "@/models/User";
import { useGetStockCloseQuery } from "@/services/PolygonApi";
import { AddModal } from "@/components/portfolio/AddModal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({});
  const selectedUser = useSelector((state: any) => state.user.selectedUser);

  const holdings: Holding[] = selectedUser?.holdings;

  const queries = holdings.map((holding) => {
    return useGetStockCloseQuery(holding.symbol);
  });

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

  const handleFormSubmit = (data: any) => {
    console.log("Here is the new holding: ", data);
    setFormData(data);
  };

  useEffect(() => {
    console.log('Updated formData:', formData);
  }, [formData]);

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
          onFormSubmit={handleFormSubmit}
        />
      )}
    </>
  )
}

export default HomePage
