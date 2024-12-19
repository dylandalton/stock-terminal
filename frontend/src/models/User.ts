export interface Purchase {
    shares: number;
    price: number;
    purchaseDate: string;
    _id?: string;
}

export interface Holding {
    symbol: string;
    companyName?: string;
    shares: number;
    averagePrice: number;
    purchases: Purchase[]
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