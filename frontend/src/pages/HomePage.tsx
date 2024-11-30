import { PortfolioCards } from "@/components/portfolio/portfolioCards";
import Portfolio from '../components/portfolio/portfolio';
import { useSelector } from "react-redux";
import { Holding } from "@/models/User";
import { useGetMultipleStockClosesQuery } from "@/services/PolygonApi";
import { AddModal } from "@/components/portfolio/AddModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateHoldingMutation } from "@/services/PortfoliosApi";

const HomePage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [createHolding] = useCreateHoldingMutation();
  
  const selectedUser = useSelector((state: any) => state.user.selectedUser);
  const userId = selectedUser?._id;

  const holdings: Holding[] = selectedUser?.holdings;
  const symbols = holdings.map(holding => holding.symbol);
  const { data, isLoading, error } = useGetMultipleStockClosesQuery(symbols);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching stocks</div>;

  const prevCloses: number[] = [];

  if (data) {
    data.forEach((stockData) => {
      const prevClose = stockData.results[0]?.c;
      if (prevClose !== undefined) {
        prevCloses.push(prevClose);
      }
    });
  }

  // Convert this from Prop Drilling to making use of a Redux Slice + Mutation
  const handleFormSubmit = async (data: any) => {
    try {
      const holdingData = {
        symbol: data.symbol,
        companyName: data.companyName,
        shares: parseFloat(data.shares),
        averagePrice: parseFloat(data.averagePrice)
      };

      const response = await createHolding({ 
        userId, 
        holdingData 
      }).unwrap();

      console.log('Holding created successfully', response);
    } catch (error) {
      console.error('Failed to create holding', error);
    }
  };

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
