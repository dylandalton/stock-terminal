import LoginCard from '@/components/login/login-card';
import { Spinner } from '@/components/ui/spinner';
import { useGetPortfoliosQuery } from '@/services/PortfoliosApi';

const LoginPage = () => {
    // Create login page, where user will select an Account (The User/ PortofioId corresponds in the DB)
    // Then once selected, navigate to the homepage, and fetch that user's portfolio (perhaps from the store using Redux)

    const { data, isFetching } = useGetPortfoliosQuery({});

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

    const portfolios = data;
    console.log(portfolios);

    return (
        <>
            <LoginCard />
        </>
    );
}

export default LoginPage
