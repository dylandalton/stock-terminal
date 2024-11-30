export interface Holding {
    symbol: string;
    companyName?: string;
    shares: number;
    averagePrice: number;
    _id?: string;
}
  
export interface User {
    _id: string;
    user: string;
    avatarUrl?: string;
    holdings: Holding[];
}