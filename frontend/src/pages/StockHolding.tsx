import { Link } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react';
import { useAppSelector } from "@/lib/hooks/typedHooks";
import StockChart from '@/components/stockHolding/StockChart';
import { useGetStockPastWeekHistoryQuery } from '@/services/AlphaVantageApi';
import { useDispatch } from 'react-redux';
import { clearCurrentHolding } from '@/state/slices/currentHoldingSlice';

const StockHolding = () => {
    const dispatch = useDispatch();
    const currentHolding = useAppSelector((state) => state.currentHolding);

    const { data, isLoading } = useGetStockPastWeekHistoryQuery(currentHolding.symbol);

    if(isLoading){
        return <p>Loading...</p>
    }
    // Stopped working as I hit the daily rate limit on AlphaVantage
    console.log("here's data: ", data);
    const pastWeekPrices = Object.fromEntries(
        Object.entries(data?.['Time Series (Daily)']).slice(0, 7)
    );
    const pastWeekCloses = Object.fromEntries(
        Object.entries(pastWeekPrices).map(([date, priceData]) => [
            date,
            parseFloat((priceData as any)['4. close']).toFixed(2),
        ])
    );

    console.log("AlphaV Modded: ", pastWeekCloses);

    return (
        <>
            {/* <StockChart 
                symbol={currentHolding.symbol}
                companyName={currentHolding.companyName}
                initialPrices={}
            /> */}
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                    to="/home"
                    className="text-indigo-500 hover:text-indigo-600 flex items-center"
                    onClick={() => dispatch(clearCurrentHolding())}
                    >
                    <CircleArrowLeft className="mr-2" /> Back to Portfolio Dashboard
                    </Link>
                </div>
            </section>
        </>
    );
}

export { StockHolding as default };
