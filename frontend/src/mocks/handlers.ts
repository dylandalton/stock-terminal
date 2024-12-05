// src/mocks/handlers.js
import { mockNewHoldingResponse, mockPortfolios } from '@/stubs/stubPortfolios';
import { http, HttpResponse } from 'msw'
import { mockMultipleStockClosesResponse } from '@/stubs/stubPolygonApi';
import { mockDailyPriceCloses } from '@/stubs/alphaVantage/stubDailyPriceCloses';
import { AlphaVantageDailyResponse, DailyData } from '@/models/alphaVantage/AlphaVDaily.model';
import { mockPastYearHistoryResponse } from '@/stubs/alphaVantage/stubWeeklyPriceCloses';
import { mockPastFiveYearsHistoryResponse } from '@/stubs/alphaVantage/stubMonthlyPriceCloses';
import { StockHistoryResponse, StockPriceData } from '@/models/alphaVantage/AlphaVantage.model';

const AlphaVantageBaseUrl = import.meta.env.VITE_ALPHAV_API_URL;
const PortfoliosBaseUrl = import.meta.env.VITE_PORTFOLIOS_API_URL;
const PolygonBaseUrl = import.meta.env.VITE_POLYGON_API_URL;

export const handlers = [
  // handler for getPortfolios - MongoDB
  http.get(PortfoliosBaseUrl, () => {
    console.log('MSW Intercepted Portfolios GET Request');
    return HttpResponse.json(mockPortfolios);
  }),

  // handler for update holding - MongoDB
  http.put(`${PortfoliosBaseUrl}/:userId/holdings/:holdingId`, ({ params }) => {
    const { userId, holdingId } = params;

    console.log('MSW Intercepted Portfolios PUT Request', { 
      userId, 
      holdingId
    });

    const mockResponse = {
      success: true,
      message: "Holding updated successfully",
      data: {
        symbol: "MSFT",
        companyName: "Microsoft Inc",
        shares: 2651,
        averagePrice: 421.15
      }
    };

    return HttpResponse.json(mockResponse, { status:200 });
  }),

  // handler for createHolding - MongoDB
  http.post(`${PortfoliosBaseUrl}/:userId/holdings`, ({ params }) => {
    const userId = params.userId;
    
    const mockResponse = {
      res: {
        ...mockNewHoldingResponse,
        message: `Holding created for user ${userId}`
      }
    };

    return HttpResponse.json(mockResponse, { status: 201 });
  }),

  // handler for deleteHolding - MongoDB
  http.delete(`${PortfoliosBaseUrl}/:userId/holdings/:symbol`, ({ params }) => {
    const { userId, symbol } = params;

    const mockResponse = {
      res: {
        success: true,
        message: `Holding ${symbol} for user ${userId} deleted`
      }
    };

    return HttpResponse.json(mockResponse);
  }),

  // handler for all three AlphaVantage endpoints
  http.get(`${AlphaVantageBaseUrl}`, ({ request }) => {
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol');
    const func = url.searchParams.get('function');
    const apiKey = url.searchParams.get('apikey');

    console.log('MSW Intercepted AlphaVantage Request', { 
      symbol, 
      function: func,
      apiKey,
      fullUrl: request.url 
    });

    if (!symbol || typeof symbol !== 'string') {
      return HttpResponse.json({ error: 'Invalid symbol parameter' }, { status: 400 });
    }

    switch(func) {
      case 'TIME_SERIES_DAILY':
        return HttpResponse.json<AlphaVantageDailyResponse>({
          'Meta Data': {
            '1. Information': "Daily Prices (open, high, low, close) and Volumes",
            '2. Symbol': symbol, 
            '3. Last Refreshed': "2024-11-29",
            '4. Output Size': "Compact",
            '5. Time Zone': "US/Eastern"
          },
          'Time Series (Daily)': mockDailyPriceCloses['Time Series (Daily)'] as Record<string, DailyData>
        });
      case 'TIME_SERIES_WEEKLY_ADJUSTED':
        return HttpResponse.json<StockHistoryResponse>({
          'Meta Data': {
            '1. Information': "Weekly Adjusted Prices and Volumes",
            '2. Symbol': symbol,
            '3. Last Refreshed': "2024-11-29",
            '4. Time Zone': "US/Eastern"
          },
          'Weekly Adjusted Time Series': mockPastYearHistoryResponse['Weekly Adjusted Time Series'] as Record<string, StockPriceData>
        });
      case 'TIME_SERIES_MONTHLY_ADJUSTED':
        return HttpResponse.json<StockHistoryResponse>({
          'Meta Data': {
            '1. Information': "Monthly Adjusted Prices and Volumes",
            '2. Symbol': symbol,
            '3. Last Refreshed': "2024-11-29",
            '4. Time Zone': "US/Eastern"
          },
          'Monthly Adjusted Time Series': mockPastFiveYearsHistoryResponse['Monthly Adjusted Time Series'] as Record<string, StockPriceData>
        });
      default:
        return HttpResponse.json({ error: 'Invalid function name' }, { status: 400 });
    }
  }),

  // Handler for getMultipleStockCloses - Polygon.io
  http.get(`${PolygonBaseUrl}/aggs/ticker/:symbol/prev`, ({ params, request }) => {
    const symbol = params.symbol;
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('apikey');
    
    console.log('MSW Intercepted Polygon Multiple Stock Closes Request', { symbol, apiKey });

    if (typeof symbol !== 'string') {
      return HttpResponse.json({ error: 'Invalid symbol parameter' }, { status: 400 });
    }

    // Find the mock response for the specific symbol
    const mockResponse = mockMultipleStockClosesResponse.find(
      item => item.ticker === symbol
    );

    if (!mockResponse) {
      return HttpResponse.json({ 
        error: `No mock data found for symbol ${symbol}` 
      }, { status: 404 });
    }

    // Create a full Polygon API response structure
    const fullResponse = {
      ticker: symbol,
      queryCount: 1,
      resultsCount: 1,
      adjusted: true,
      results: mockResponse.results,
      status: 'OK',
      request_id: `multiple-stock-closes-${symbol}`,
      count: 1
    };

    return HttpResponse.json(fullResponse);
  }),

];