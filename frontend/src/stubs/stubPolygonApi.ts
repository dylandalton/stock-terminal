import { StockData, StockNewsResponse } from '@/models/Polygon.model';

export const mockMultipleStockClosesResponse: StockData[] = [
  {
    ticker: 'AAPL',
    results: [{ c: 195.50 }]
  },
  {
    ticker: 'MSFT',
    results: [{ c: 375.25 }]
  },
  {
    ticker: 'GOOGL',
    results: [{ c: 141.75 }]
  },
  {
    ticker: 'BN',
    results: [{ c: 61.51 }]
  },
  {
    ticker: 'HLT',
    results: [{ c: 250.54 }]
  },
  {
    ticker: 'CMG',
    results: [{ c: 60.54 }]
  },
  {
    ticker: 'NKE',
    results: [{ c: 100.55 }]
  },
  {
    ticker: 'SNAP',
    results: [{ c: 121.22 }]
  }
];

export const mockStockFinancialsResponse = {
  "results": [
    {
      "start_date": "2023-07-01",
      "end_date": "2024-06-30",
      "filing_date": "2024-07-30",
      "acceptance_datetime": "2024-07-30T20:06:22Z",
      "timeframe": "annual",
      "fiscal_period": "FY",
      "fiscal_year": "2024",
      "cik": "0000789019",
      "sic": "7372",
      "tickers": [
        "MSFT"
      ],
      "company_name": "MICROSOFT CORP",
      "source_filing_url": "https://api.polygon.io/v1/reference/sec/filings/0000950170-24-087843",
      "source_filing_file_url": "http://api.polygon.io/v1/reference/sec/filings/0000950170-24-087843/files/msft-20240630_htm.xml",
      "financials": {
        "income_statement": {
          "basic_average_shares": {
            "value": 7431000000,
            "unit": "shares",
            "label": "Basic Average Shares",
            "order": 4400
          },
          "operating_income_loss": {
            "value": 109433000000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "operating_expenses": {
            "value": 61575000000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          },
          "research_and_development": {
            "value": 29510000000,
            "unit": "USD",
            "label": "Research and Development",
            "order": 1030
          },
          "net_income_loss": {
            "value": 88136000000,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "basic_earnings_per_share": {
            "value": 11.86,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "diluted_average_shares": {
            "value": 7469000000,
            "unit": "shares",
            "label": "Diluted Average Shares",
            "order": 4500
          },
          "revenues": {
            "value": 245122000000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "gross_profit": {
            "value": 171008000000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
        },
        "cash_flow_statement": {
          "net_cash_flow": {
            "value": -16179000000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
        },
        "comprehensive_income": {
          "comprehensive_income_loss_attributable_to_parent": {
            "value": 88889000000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          },
          "other_comprehensive_income_loss_attributable_to_parent": {
            "value": 753000000,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss Attributable To Parent",
            "order": 600
          },
          "comprehensive_income_loss": {
            "value": 88889000000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          },
          "other_comprehensive_income_loss": {
            "value": 88889000000,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          },
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          }
        },
        "balance_sheet": {
          "liabilities": {
            "value": 243686000000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "noncurrent_assets": {
            "value": 352429000000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "long_term_debt": {
            "value": 44937000000,
            "unit": "USD",
            "label": "Long-term Debt",
            "order": 810
          },
          "equity": {
            "value": 268477000000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "current_assets": {
            "value": 159734000000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "noncurrent_liabilities": {
            "value": 118400000000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "cash": {
            "value": 75543000000,
            "unit": "USD",
            "label": "Cash",
            "order": 210
          },
          "current_liabilities": {
            "value": 125286000000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          },
          "assets": {
            "value": 512163000000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          }
        }
      }
    },
  ]
}

export const mockStockNewsResponse: StockNewsResponse = {
  "results":
  [
    {
      "id":"3bb0e0d887d5dfcb2080ec6fb96866e279657bac742e158fb7207292bccee4c2",
      "publisher":{
        "name":"GlobeNewswire Inc.",
        "homepage_url":"https://www.globenewswire.com",
        "logo_url":"https://s3.polygon.io/public/assets/news/logos/globenewswire.svg",
        "favicon_url":"https://s3.polygon.io/public/assets/news/favicons/globenewswire.ico"
      },
      "title":"Data Center Virtualization Market to Reach USD 28.9 Billion by 2032, Driven by the Growing Need for Scalable, Cost-Effective Infrastructure Solutions | Research by SNS Insider",
      "author":"Sns Insider",
      "published_utc":"2024-12-06T14:00:00Z",
      "article_url":"https://www.globenewswire.com/news-release/2024/12/06/2993074/0/en/Data-Center-Virtualization-Market-to-Reach-USD-28-9-Billion-by-2032-Driven-by-the-Growing-Need-for-Scalable-Cost-Effective-Infrastructure-Solutions-Research-by-SNS-Insider.html",
      "tickers":
      [
        "MSFT",
        "CSCO",
        "IBM",
        "AMZN",
        "ORCL",
        "HPE",
        "HPEpC",
        "DELL",
        "NTNX",
        "GOOG",
        "GOOGL",
        "BABA",
        "JNPR",
        "AVGO"
      ],
      "image_url":"https://ml.globenewswire.com/Resource/Download/d6272c2e-d204-41b8-b545-a6e2e24f85c2",
      "description":"The data center virtualization market is experiencing significant growth due to the increasing need for businesses to scale operations efficiently while minimizing costs. The demand for flexible, cost-effective IT infrastructure solutions is driving businesses toward virtualization technologies.",
      "keywords":
      [
        "data center virtualization",
        "cloud computing",
        "IT infrastructure",
        "virtualization technology",
        "digital transformation"
      ],
      "insights":
      [
        {
          "ticker":"MSFT",
          "sentiment":"positive",
          "sentiment_reasoning":"Microsoft's Hyper-V is also highlighted as a leading data center virtualization solution, indicating the company's strong presence in this market."
        },
        {
          "ticker":"CSCO",
          "sentiment":"positive",
          "sentiment_reasoning":"Cisco's Nexus 9000 Series is mentioned as a key data center virtualization offering, showcasing the company's involvement in this growing market."
        },
        {
          "ticker":"IBM",
          "sentiment":"positive",
          "sentiment_reasoning":"IBM's Cloud Virtual Servers are highlighted as a prominent data center virtualization solution, suggesting the company's active participation in this space."
        },
        {
          "ticker":"AMZN",
          "sentiment":"positive",
          "sentiment_reasoning":"AWS's Amazon EC2 is mentioned as a leading data center virtualization platform, indicating the company's strong presence in the market."
        },
        {
          "ticker":"ORCL",
          "sentiment":"positive",
          "sentiment_reasoning":"Oracle's VM solution is included in the list of major data center virtualization offerings, demonstrating the company's involvement in this market."
        },
        {
          "ticker":"HPE",
          "sentiment":"positive",
          "sentiment_reasoning":"HPE's OneView is highlighted as a key data center virtualization product, suggesting the company's active participation in this growing market."
        },
        {
          "ticker":"HPEpC",
          "sentiment":"positive",
          "sentiment_reasoning":"HPE's OneView is highlighted as a key data center virtualization product, suggesting the company's active participation in this growing market."
        },
        {
          "ticker":"DELL",
          "sentiment":"positive",
          "sentiment_reasoning":"Dell's VMware Cloud on Dell EMC is mentioned as a prominent data center virtualization solution, indicating the company's strong presence in this market."
        },
        {
          "ticker":"NTNX",
          "sentiment":"positive",
          "sentiment_reasoning":"Nutanix's AHV is included in the list of major data center virtualization solutions, showcasing the company's involvement in this growing market."
        },
        {
          "ticker":"GOOG",
          "sentiment":"positive",
          "sentiment_reasoning":"Google Cloud's VMware Engine is mentioned as a key data center virtualization platform, suggesting the company's active participation in this market."
        },
        {
          "ticker":"GOOGL",
          "sentiment":"positive",
          "sentiment_reasoning":"Google Cloud's VMware Engine is mentioned as a key data center virtualization platform, suggesting the company's active participation in this market."
        },
        {
          "ticker":"BABA",
          "sentiment":"positive",
          "sentiment_reasoning":"Alibaba Cloud's Elastic Compute Service (ECS) is highlighted as a prominent data center virtualization offering, indicating the company's strong presence in this market."
        },
      ]
    }
  ],
  "status":"OK",
  "request_id":"3e99e7cb28d19fb32fd2b8d6ed9c88e3",
  "count":1,
  "next_url":"https://api.polygon.io/v2/reference/news?cursor=YXA9MjAyNC0xMi0wNlQxNCUzQTAwJTNBMDBaJmFzPTNiYjBlMGQ4ODdkNWRmY2IyMDgwZWM2ZmI5Njg2NmUyNzk2NTdiYWM3NDJlMTU4ZmI3MjA3MjkyYmNjZWU0YzImbGltaXQ9MSZvcmRlcj1kZXNjZW5kaW5nJnRpY2tlcj1NU0ZU"
}