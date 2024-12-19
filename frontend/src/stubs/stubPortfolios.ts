import { Holding, UserData } from "@/models/User";

export const mockPortfolios: UserData = {
  success: true,
  data: [
    {
      "_id": "6748bf211028d5d9fc0ddabb",
      "user": "Stanley Druckenmiller",
      "holdings": [
        {
          "symbol": "NVDA",
          "companyName": "Nvidia",
          "shares": 7320,
          "averagePrice": 452.57,
          "purchases": [
            {
              "shares": 7319,
              "price": 451.55,
              "purchaseDate": "2024-11-28T00:00:00.000Z",
              "_id": "6748bf211028d5d9fc0ddabc"
            }
          ],
          "_id": "674a0133d3a97add6fe706e2"
        },
        {
          "symbol": "BABA",
          "companyName": "Alibaba",
          "shares": 1230,
          "averagePrice": 200.5,
          "purchases": [
            {
              "shares": 1233,
              "price": 200.55,
              "purchaseDate": "2024-11-28T00:00:00.000Z",
              "_id": "6748bf211028d5d9fc0ddabd"
            }
          ],
          "_id": "674a0133d3a97add6fe706e3"
        }
      ],
      "avatarUrl": "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-1/247506740_104516858693592_3168639955025772786_n.jpg?stp=c41.0.187.187a_dst-jpg_s186x187&_nc_cat=101&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=uWjGzcsLPwUQ7kNvgF5rwAh&_nc_zt=24&_nc_ht=scontent-man2-1.xx&_nc_gid=Ap1rn7ZCkqVtPCj-R7kfuY3&oh=00_AYDv3tlG0l8vadDZOVhk_X3rSNr0ZVDcjhf8wgqBcH8NAQ&oe=674FF95E"
    },
    {
      "_id": "674a00cad3a97add6fe706d5",
      "user": "Bill Ackman",
      "holdings": [
        {
          "symbol": "BN",
          "companyName": "Brookfield Corp",
          "shares": 32735883,
          "averagePrice": 53.15,
          "purchases": [
            {
              "shares": 16367942.5,
              "price": 53.2,
              "purchaseDate": "2024-11-28T00:00:00.000Z",
              "_id": "674a00cad3a97add6fe706d7"
            },
            {
              "shares": 16367942.5,
              "price": 50.95,
              "purchaseDate": "2024-11-28T00:00:00.000Z",
              "_id": "674a00cad3a97add6fe706d7"
            }
          ],
          "_id": "674a00cad3a97add6fe706d9"
        },
        {
          "symbol": "HLT",
          "companyName": "Hilton Worldwide Holdings",
          "shares": 7370168,
          "averagePrice": 230.5,
          "purchases": [
            {
              "shares": 7370171,
              "price": 233.52,
              "purchaseDate": "2024-11-28T00:00:00.000Z",
              "_id": "674a00cad3a97add6fe706da"
            }
          ],
          "_id": "674a00cad3a97add6fe706d8"
        },
        {
          "symbol": "CMG",
          "companyName": "Chipotle Mexican Grill",
          "shares": 28815165,
          "averagePrice": 57.62,
          "purchases": [
            {
              "shares": 28815165,
              "price": 57.65,
              "purchaseDate": "2024-11-28T00:00:00.000Z",
              "_id": "674a00cad3a97add6fe706d9"
            }
          ],
          "_id": "674b331ef376fc7db241b00d"
        },
        {
          "symbol": "NKE",
          "companyName": "Nike Inc",
          "shares": 16280338,
          "averagePrice": 88.4,
          "purchases": [
            {
              "shares": 16280339,
              "price": 88.5,
              "purchaseDate": "2024-11-28T00:00:00.000Z",
              "_id": "674a00cad3a97add6fe706db"
            }
          ],
          "_id": "674a00cad3a97add6fe706d6"
        }
      ],
      "avatarUrl": "https://www.worldtopinvestors.com/wp-content/uploads/2018/01/Bill-Ackman-world-top-investors.jpg"
    },
    {
      "_id": "674a02f9d3a97add6fe70707",
      "user": "Michael Burry",
      "holdings": [
        {
          "symbol": "BIDU",
          "companyName": "Baidu Inc",
          "shares": 2450,
          "averagePrice": 79.05,
          "purchases": [
            {
              "shares": 2450,
              "price": 79.25,
              "purchaseDate": "2024-11-28T00:00:00.000Z",
              "_id": "674a02f9d3a97add6fe7070a"
            }
          ],
          "_id": "674a02f9d3a97add6fe70708"
        },
        {
          "symbol": "TD",
          "companyName": "TD Inc",
          "shares": 1111,
          "averagePrice": 75.5,
          "purchases": [
            {
              "shares": 1112,
              "price": 76.22,
              "purchaseDate": "2024-11-28T00:00:00.000Z",
              "_id": "674a02f9d3a97add6fe7070b"
            }
          ],
          "_id": "674a02f9d3a97add6fe70709"
        }
      ],
      "avatarUrl": "https://static1.personality-database.com/profile_images/55142f01d951446ea234949e6fa397c4.png"
    }
  ]
};

export const mockNewHolding: Holding = {
    symbol: "V",
    companyName: "Visa",
    shares: 1905,
    averagePrice: 162.25,
    purchases: 
    [
      {
        shares: 2450,
        price: 79.25,
        purchaseDate: "2024-11-28T00:00:00.000Z"
      }
    ],
  };
  
  export const mockNewHoldingResponse = {
    success: true,
    message: "Holding created successfully",
    data: mockNewHolding
  };