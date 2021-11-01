import { atom } from "recoil";
import { GameI } from "../interfaces/Game";
import { TokenI } from "../interfaces/Token";
import { UserI } from "../interfaces/User";

export const tokensState = atom<TokenI[]>({
    key: 'tokensState',
    default: [],
});

export const gamesState = atom<GameI[]>({
    key: 'gamesState',
    default: [],
});

export const userState = atom<UserI | null>({
    key: 'userState',
    default: null,
});