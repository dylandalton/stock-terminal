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

export interface UserData {
    success: boolean;
    data: User[];
}

export interface PortfoliosResponse {
    res: UserData;
}