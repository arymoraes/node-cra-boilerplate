import { TokenI, TokenRawI } from "../../interfaces/Token";
import api from "./apiConfig";

export const apiGetTokens = async () => {
    try {
        const tokens = await api().get('/tokens');
        return tokens.data;
    } catch (err) {
        return false;
    }
}

export const apiAddToken = async (tokenInput: TokenRawI) => {
    try {
        const token = await api().post('/token', tokenInput);
        return token.data;
    } catch (error) {
        return false;
    }
}

export const apiDeleteToken = async (tokenId: number) => {
    try {
        const token = await api().delete(`/token/${tokenId}`);
        return token.data;
    } catch (error) {
        return false;
    }
}

export const apiEditToken = async (token: TokenI) => {
    try {
        const updatedToken = await api().put(`/token/${token.id}`, token);
        return updatedToken.data;
    } catch (error) {
        return false;
    }
}