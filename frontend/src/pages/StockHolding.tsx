import { Link } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks/typedHooks";
import StockChart from '@/components/stockHolding/StockChart';
import { useGetStockPastWeekHistoryQuery } from '@/services/AlphaVantageApi';
import { useDispatch } from 'react-redux';
import { clearCurrentHolding } from '@/state/slices/currentHoldingSlice';
import KeyStatsCard from '@/components/KeyStatsCard';
import { useGetStockFinancialsQuery } from '@/services/PolygonApi';
import { Financials, StockFinancialsResponse } from '@/models/Polygon.model';
import { Spinner } from '@/components/ui/spinner';import { useEffect } from 'react';
import CompanyNewsCard from '@/components/stockHolding/company-news-card';
import { getScrapedArticlesAsync } from '@/state/slices/scrapedArticlesSlice';

const StockHolding = () => {
    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();
    const currentHolding = useAppSelector((state) => state.currentHolding);
    const scrapedArticlesArray = useAppSelector((state) => state.scrapeArticles.scrapedArticlesArray);

    const { data, isLoading } = useGetStockPastWeekHistoryQuery(currentHolding.symbol);

    const { data: financialData, isLoading: isFetching }: {
        data?: StockFinancialsResponse | undefined, 
        isLoading: boolean
    } = useGetStockFinancialsQuery(currentHolding.symbol);

    useEffect(() => {
        if(currentHolding){
            // Server-side handles the limit of three non-premium articles
            appDispatch(getScrapedArticlesAsync({symbol : currentHolding.symbol}))
        }
    }, [currentHolding, appDispatch]);

    if(isLoading || isFetching){
        return (
            <div className="h-[88px] flex items-center justify-center">
                <Spinner size="xl" />
            </div>
        )
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
            <div className='my-5'>
                <StockChart 
                    symbol={currentHolding.symbol}
                    companyName={currentHolding.companyName}
                    initialPrices={pastWeekCloses}
                />
            </div>
            {financials && <KeyStatsCard financials={financials} />}
            {scrapedArticlesArray && <CompanyNewsCard />}
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                    to="/home"
                    className="text-black hover:text-indigo-600 flex items-center"
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
