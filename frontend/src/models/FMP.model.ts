export interface DividendHistory{
    symbol: string;
    historical: Dividend[];
}

export interface Dividend{
    date: string;
    label: string;
    adjDividend: number;
    dividend: number;
    recordDate: string;
    paymentDate: string;
    declarationDate: string;
}