import api from "./apiConfig";

export const apiGetTokens = async () => {
    try {
        const tokens = await api().get('/tokens');
        return tokens.data;
    } catch (err) {
        return false;
    }
}

export const apiAddToken = async (contract: string) => {
    try {
        const token = await api().post('/token', { contract });
        return token.data;
    } catch (error) {
        return false;
    }
}