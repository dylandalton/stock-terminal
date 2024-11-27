import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react';
import { useGetStockQuery } from "@/services/StocksApi";

const StockHolding = () => {
    const { symbol } = useParams();
    const navigate = useNavigate();

    const { data, isFetching } = useGetStockQuery(symbol);

    if (isFetching) return 'Loading...';
    const stockHolding = data?.["Global Quote"];
    console.log(stockHolding);

    return (
        <>
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                    to="/jobs"
                    className="text-indigo-500 hover:text-indigo-600 flex items-center"
                    >
                    <CircleArrowLeft />Back to Portfolio Dashboard
                    </Link>
                </div>
            </section>
        </>
    );
}

interface Params {
    symbol: string;
  }

const holdingLoader = async ({params}: {params: Params}) => {
    const res = await fetch(`/api/${params.symbol}`);
    const data = await res.json();
    return data;
}

export { StockHolding as default, holdingLoader };
