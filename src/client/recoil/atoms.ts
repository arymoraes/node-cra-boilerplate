import { atom } from "recoil";
import { GameI } from "../interfaces/Game";
import { TokenI } from "../interfaces/Token";

export const tokensState = atom<TokenI[]>({
    key: 'tokensState',
    default: [],
});

export const gamesState = atom<GameI[]>({
    key: 'gamesState',
    default: [],
});