import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-6" aria-hidden="true" />
      <h1 className="text-4xl font-bold mb-4 text-foreground sm:text-5xl md:text-6xl">404 Not Found</h1>
      <p className="text-lg mb-8 text-muted-foreground sm:text-xl">This page does not exist</p>
      <Button asChild>
        <Link to="/home">
          Go Back
        </Link>
      </Button>
    </main>
  );
};

export default NotFoundPage;
