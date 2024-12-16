import './App.css'
import { 
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import StockHolding from './pages/StockHolding';
import LoginPage from './pages/LoginPage';
import DivCalendarPage from './pages/DivCalendarPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/calendar' element={<DivCalendarPage /> } />
        <Route path="/holdings/:symbol" element={<StockHolding />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
