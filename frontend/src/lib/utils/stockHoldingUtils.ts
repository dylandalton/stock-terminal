import { PastWeekCloses, StockPriceApiResponse } from "@/models/AlphaVantage.model";

// export const getPastWeekCloses = (data: StockPriceApiResponse) => {
//     const pastWeekPrices = Object.fromEntries(
//         Object.entries(data?.['Time Series (Daily)']).slice(0, 7)
//     );
//     const pastWeekCloses = Object.fromEntries(
//         Object.entries(pastWeekPrices).map(([date, priceData]) => [
//             date,
//             parseFloat((priceData as any)['4. close']).toFixed(2),
//         ])
//     );
//     return pastWeekCloses;
// }