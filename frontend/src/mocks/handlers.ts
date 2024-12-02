// src/mocks/handlers.js
import { mockNewHoldingResponse, mockPortfolios } from '@/stubs/stubPortfolios';
import { http, HttpResponse } from 'msw'
import { mockMultipleStockClosesResponse } from '@/stubs/stubPolygonApi';
import { mockDailyPriceCloses } from '@/stubs/alphaVantage/stubDailyPriceCloses';
import { AlphaVantageDailyResponse, DailyData } from '@/models/alphaVantage/AlphaVDaily.model';
import { mockPastYearHistoryResponse } from '@/stubs/alphaVantage/stubWeeklyPriceCloses';
import { mockPastFiveYearsHistoryResponse } from '@/stubs/alphaVantage/stubMonthlyPriceCloses';

const AlphaVantageBaseUrl = import.meta.env.VITE_ALPHAV_API_URL;
const PortfoliosBaseUrl = import.meta.env.VITE_PORTFOLIOS_API_URL;
const PolygonBaseUrl = import.meta.env.VITE_POLYGON_API_URL;

export const handlers = [
  // Mock for getPortfolios - MongoDB
  http.get(PortfoliosBaseUrl, () => {
    return HttpResponse.json(mockPortfolios);
  }),

  // Mock for createHolding - MongoDB
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

  // Mock for deleteHolding - MongoDB
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

  // handler for getStockPastWeekHistory endpoint
  http.get(`${AlphaVantageBaseUrl}`, ({ request }) => {
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol');
    const func = url.searchParams.get('function');
    const outputsize = url.searchParams.get('outputsize');
    const apiKey = url.searchParams.get('apikey');

    console.log('MSW Intercepted AlphaVantage Request', { 
      symbol, 
      function: func, 
      outputsize, 
      apiKey,
      fullUrl: request.url 
    });

    if (!symbol || typeof symbol !== 'string') {
      return HttpResponse.json({ error: 'Invalid symbol parameter' }, { status: 400 });
    }

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
  }),

  // Handler for getStockPastYearHistory - AlphaVantage
  http.get(`${AlphaVantageBaseUrl}?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=:symbol&apikey=:apiKey`, ({ params }) => {
    const symbol = params.symbol;
    console.log('MSW Intercepted AlphaVantage Past Year History Request', params);

    if (typeof symbol !== 'string') {
      return HttpResponse.json({ error: 'Invalid symbol parameter' }, { status: 400 });
    }

    const response = JSON.parse(JSON.stringify(mockPastYearHistoryResponse));
    response['Meta Data']['2. Symbol'] = symbol;

    return HttpResponse.json(response);
  }),

  // Handler for getStockPastFiveYearsHistory - AlphaVantage
  http.get(`${AlphaVantageBaseUrl}?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=:symbol&apikey=:apiKey`, ({ params }) => {
    const symbol = params.symbol;
    console.log('MSW Intercepted AlphaVantage Past Five Years History Request', params);

    if (typeof symbol !== 'string') {
      return HttpResponse.json({ error: 'Invalid symbol parameter' }, { status: 400 });
    }

    const response = JSON.parse(JSON.stringify(mockPastFiveYearsHistoryResponse));
    response['Meta Data']['2. Symbol'] = symbol;

    return HttpResponse.json(response);
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