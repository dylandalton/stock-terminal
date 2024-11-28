import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react';
import { useGetStockQuery } from "@/services/StocksApi";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";

const StockHolding = () => {
    const { symbol } = useParams();
    const navigate = useNavigate();

    const { data, isFetching } = useGetStockQuery(symbol);

    if (isFetching) return (
        <div className="min-h-screen bg-background p-8 flex items-center justify-center">
            <button type="button" className="flex items-center rounded-lg bg-black px-4 py-2 text-white" disabled>
                <div className="flex items-center justify-center gap-8 mr-2">
                    <div className="flex flex-col items-center gap-2">
                        <Spinner size="md" variant="white"/>
                    </div>
                </div>
                <span className="font-medium"> Processing... </span>
            </button>
        </div>
    );

    const stockHolding = data?.["Global Quote"];
    console.log(stockHolding);

    return (
        <>
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                    to="/"
                    className="text-indigo-500 hover:text-indigo-600 flex items-center"
                    >
                    <CircleArrowLeft className="mr-2" /> Back to Portfolio Dashboard
                    </Link>
                </div>
            </section>
        </>
    );
}

export { StockHolding as default };
