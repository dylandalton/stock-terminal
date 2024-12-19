import { PortfolioCards } from "@/components/portfolio/portfolioCards";
import Portfolio from '../components/portfolio/portfolio';
import { Holding } from "@/models/User";
import { useGetMultipleStockClosesQuery } from "@/services/PolygonApi";
import { AddModal } from "@/components/portfolio/AddModal";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks/typedHooks";
import { useDispatch } from "react-redux";
import { closeAddHoldingModal, openAddHoldingModal } from "@/state/slices/addModalSlice";
import DeleteModal from "@/components/portfolio/DeleteModal";
import { closeDeleteHoldingModal } from "@/state/slices/deleteModalSlice";
import ToggleableChart from "@/components/portfolio/ToggleableChart";
import { closeModifyHoldingModal } from "@/state/slices/modifyModalSlice";
import { ModifyModal } from "@/components/portfolio/ModifyModal";
import { Spinner } from "@/components/ui/spinner";
import { setStockSymbols } from "@/state/slices/dividendHistorySlice";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const showAddHoldingModal = useAppSelector((state) => state.addModal.showAddHoldingModal);

  const showDeleteHoldingModal = useAppSelector((state) => state.deleteModal.showDeleteHoldingModal);
  const symbolToDelete = useAppSelector((state) => state.deleteModal.symbolToDelete);

  const showModifyHoldingModal = useAppSelector((state) => state.modifyModal.showModifyHoldingModal);
  const holdingToUpdate = useAppSelector((state) => state.modifyModal.holdingData);

  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const userId = selectedUser?._id;

  const holdings: Holding[] = selectedUser?.holdings ?? [];
  const symbols = holdings.map(holding => holding.symbol);
  if(selectedUser){
    console.log('holdings:', selectedUser);
  }

  useEffect(() => {
    if (symbols.length > 0) {
      dispatch(setStockSymbols(symbols));
    }
  }, [dispatch, symbols]);

  const { data, isLoading, error } = useGetMultipleStockClosesQuery(symbols);

  if (isLoading) return (
    <div className="h-[88px] flex items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
  if (error) return <div>Error fetching stocks</div>;

  const prevCloses = data?.map((stockData) => stockData.results[0]?.c ?? 0) ?? [];

  return (
    <>
      <PortfolioCards positions={holdings} closes={prevCloses}/>
      <ToggleableChart holdings={holdings}/>
      {(holdings.length > 0) ? 
        <Portfolio 
          positions={holdings} 
          closes={prevCloses}
        /> : 
        <Button 
          className="w-full"
          variant="login"
          onClick={() => dispatch(openAddHoldingModal())}
        >
          Add An Investment
        </Button>
      }
      {showAddHoldingModal && (
        <AddModal 
          isOpen={showAddHoldingModal} 
          onClose={() => dispatch(closeAddHoldingModal())}
          userId={userId}
        />
      )}
      {showDeleteHoldingModal && (
        <DeleteModal 
          userId={userId}
          symbol={symbolToDelete}
          isOpen={showDeleteHoldingModal} 
          onRemove={() => dispatch(closeDeleteHoldingModal())} 
        />
      )}
      {showModifyHoldingModal && (
        <ModifyModal
          userId={userId}
          holding={holdingToUpdate}
          isOpen={showModifyHoldingModal} 
          onClose={() => dispatch(closeModifyHoldingModal())}
        />
      )}
    </>
  )
}

export default HomePage
