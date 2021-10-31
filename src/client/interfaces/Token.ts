import { GameI } from "./Game";

export interface TokenRawI {
    contract: string,
}

export interface TokenEditI extends TokenRawI {
    name: string,
    symbol: string,
    game?: GameI,
}

export interface TokenI extends TokenRawI {
    id: number,
    created_at: string,
    updated_at: string,
    price: string,
    name: string,
    symbol: string,
    game?: GameI,
}
