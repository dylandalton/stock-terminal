export interface StockData {
    ticker: string;
    results: Array<{
      c: number;
    }>;
}

export interface PolygonAPIResult {
    T: string;
    v: number;
    vw: number;
    o: number;
    c: number;
    h: number;
    l: number;
    t: number;
    n: number;
}
  
export interface PolygonAPIResponse {
    ticker: string;
    queryCount: number;
    resultsCount: number;
    adjusted: boolean;
    results: PolygonAPIResult[];
    status: string;
    request_id: string;
    count: number;
}

// =============== Stock Financials Models ======================
interface FinancialValue {
    value: number;
    unit: string;
    label: string;
    order: number;
}
  
interface IncomeStatement {
    basic_average_shares: FinancialValue;
    operating_income_loss: FinancialValue;
    operating_expenses: FinancialValue;
    research_and_development: FinancialValue;
    net_income_loss: FinancialValue;
    basic_earnings_per_share: FinancialValue;
    diluted_average_shares: FinancialValue;
    revenues: FinancialValue;
    gross_profit: FinancialValue;
}

interface CashFlowStatement {
    net_cash_flow: FinancialValue;
}

interface ComprehensiveIncome {
    comprehensive_income_loss_attributable_to_parent: FinancialValue;
    other_comprehensive_income_loss_attributable_to_parent: FinancialValue;
    comprehensive_income_loss: FinancialValue;
    other_comprehensive_income_loss: FinancialValue;
    comprehensive_income_loss_attributable_to_noncontrolling_interest: FinancialValue;
}

interface BalanceSheet {
    liabilities: FinancialValue;
    noncurrent_assets: FinancialValue;
    long_term_debt: FinancialValue;
    equity: FinancialValue;
    current_assets: FinancialValue;
    noncurrent_liabilities: FinancialValue;
    cash: FinancialValue;
    current_liabilities: FinancialValue;
    assets: FinancialValue;
}

export interface Financials {
    income_statement: IncomeStatement;
    cash_flow_statement: CashFlowStatement;
    comprehensive_income: ComprehensiveIncome;
    balance_sheet: BalanceSheet;
}

interface StockFinancial {
    start_date: string;
    end_date: string;
    filing_date: string;
    acceptance_datetime: string;
    timeframe: string;
    fiscal_period: string;
    fiscal_year: string;
    cik: string;
    sic: string;
    tickers: string[];
    company_name: string;
    source_filing_url: string;
    source_filing_file_url: string;
    financials: Financials;
}

export interface StockFinancialsResponse {
    results: StockFinancial[];
}

interface Publisher {
    name: string;
    homepage_url: string;
    logo_url: string;
    favicon_url: string;
  }
  
  interface Insight {
    ticker: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    sentiment_reasoning: string;
  }
  
  interface StockNewsItem {
    id: string;
    publisher: Publisher;
    title: string;
    author: string;
    published_utc: string;
    article_url: string;
    tickers: string[];
    image_url: string;
    description: string;
    keywords: string[];
    insights: Insight[];
  }
  
  export interface StockNewsResponse {
    results: StockNewsItem[];
    status: string;
    request_id: string;
    count: number;
    next_url?: string;
  }

  export interface ArticleProps {
    title: string;
    author: string;
    article_url: string;
  }