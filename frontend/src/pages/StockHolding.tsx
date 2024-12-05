import { Link } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react';
import { useAppSelector } from "@/lib/hooks/typedHooks";
import StockChart from '@/components/stockHolding/StockChart';
import { useGetStockPastWeekHistoryQuery } from '@/services/AlphaVantageApi';
import { useDispatch } from 'react-redux';
import { clearCurrentHolding } from '@/state/slices/currentHoldingSlice';
import KeyStatsCard from '@/components/KeyStatsCard';
import { useGetStockFinancialsQuery } from '@/services/PolygonApi';
import { Financials, StockFinancialsResponse } from '@/models/Polygon.model';

const StockHolding = () => {
    const dispatch = useDispatch();
    const currentHolding = useAppSelector((state) => state.currentHolding);
    const { data, isLoading } = useGetStockPastWeekHistoryQuery(currentHolding.symbol);
    const { data: financialData, isLoading: isFetching }: {
        data?: StockFinancialsResponse | undefined, 
        isLoading: boolean 
    } = useGetStockFinancialsQuery(currentHolding.symbol);

    if(isLoading || isFetching){
        return <p>Loading...</p>
    }

    const financials: Financials | undefined = financialData?.results[0]?.financials;

    const pastWeekPrices = Object.fromEntries(
        Object.entries(data?.['Time Series (Daily)'] ?? {}).slice(0, 7)
    );
    const pastWeekCloses = Object.fromEntries(
        Object.entries(pastWeekPrices).map(([date, priceData]) => [
            date,
            parseFloat((priceData as any)['4. close']).toFixed(2),
        ])
    );

    return (
        <>
            <StockChart 
                symbol={currentHolding.symbol}
                companyName={currentHolding.companyName}
                initialPrices={pastWeekCloses}
            />
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
            {financials && <KeyStatsCard financials={financials} />}
        </>
    );
}

export { StockHolding as default };
