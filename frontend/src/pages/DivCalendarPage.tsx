import DividendCalendar from "@/components/calendar/dividend-calendar";
import { Spinner } from "@/components/ui/spinner";
import { useAppSelector } from "@/lib/hooks/typedHooks";
import { useGetDividendHistoryQuery } from "@/services/FMPApi";

const DivCalendarPage = () => {
  const symbols: string[] | null = useAppSelector((state) => state.dividendHistory.stockSymbols);

  const dividendQueries = symbols ? symbols.map((symbol) => 
    useGetDividendHistoryQuery(symbol)
  ) : [];
  // const isLoading = dividendQueries.some(query => query.isLoading);
  // const hasError = dividendQueries.some(query => query.error);

  // Check if dividendQueries is not empty before accessing its properties
  const isLoading = dividendQueries.length > 0 ? dividendQueries.some(query => query.isLoading) : false;
  const hasError = dividendQueries.length > 0 ? dividendQueries.some(query => query.error) : false;

  const dividends = dividendQueries.flatMap((query, index) => {
    const dividendHistory = query.data;
    if (dividendHistory && symbols) {
      return dividendHistory.historical.map(div => ({
        ...div,
        symbol: symbols[index]
      }));
    }
    return [];
  });

  if (isLoading) return (
    <div className="h-[88px] flex items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
  if (hasError) return <div>Error fetching dividends</div>;
  if(!isLoading){
    console.log("Response: ", dividendQueries);
  }
  return (
    <>
      {dividends && <DividendCalendar dividends={dividends}/>}
    </>
  )
}

export default DivCalendarPage