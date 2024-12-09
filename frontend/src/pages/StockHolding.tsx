import { Link } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks/typedHooks";
import StockChart from '@/components/stockHolding/StockChart';
import { useGetStockPastWeekHistoryQuery } from '@/services/AlphaVantageApi';
import { useDispatch } from 'react-redux';
import { clearCurrentHolding } from '@/state/slices/currentHoldingSlice';
import KeyStatsCard from '@/components/KeyStatsCard';
import { useGetStockFinancialsQuery, useGetStockNewsQuery } from '@/services/PolygonApi';
import { Financials, StockFinancialsResponse, StockNewsResponse } from '@/models/Polygon.model';
import { Spinner } from '@/components/ui/spinner';import { useEffect } from 'react';
import { getScrapeAsync } from '@/state/slices/scrapeSlice';
import CompanyNewsCard from '@/components/stockHolding/company-news-card';

const StockHolding = () => {
    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();
    const currentHolding = useAppSelector((state) => state.currentHolding);
    const scrapedArticles = useAppSelector((state) => state.scrape.scrapedArticles);

    const { data, isLoading } = useGetStockPastWeekHistoryQuery(currentHolding.symbol);

    const {data: newsData, isLoading: newsLoading}: {
        data?: StockNewsResponse | undefined,
        isLoading: boolean
    } = useGetStockNewsQuery(currentHolding.symbol);

    const { data: financialData, isLoading: isFetching }: {
        data?: StockFinancialsResponse | undefined, 
        isLoading: boolean 
    } = useGetStockFinancialsQuery(currentHolding.symbol);

    useEffect(() => {
        if (newsData?.results?.length) {
          const remainingCapacity = 3 - scrapedArticles.length;
      
          if (remainingCapacity > 0) {
            newsData.results.slice(0, remainingCapacity).forEach((item) => {
              if (item.article_url) {
                appDispatch(getScrapeAsync({ articleUrl: item.article_url }));
              }
            });
          }
        }
      }, [newsData, appDispatch, scrapedArticles.length]);

    if(isLoading || isFetching || newsLoading){
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
            {scrapedArticles && <CompanyNewsCard />}
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
