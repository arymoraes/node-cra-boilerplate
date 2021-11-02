export interface InvestmentRawI { 
    date: string;
    amount: number;
    is_withdrawal: boolean;
    game: number,
    token: number,
    token_amount: number,
}

export interface InvestmentI extends InvestmentRawI {
    id: number,
    created_at: string,
    updated_at: string,
}
