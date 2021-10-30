import { GameRawI } from "../../../interfaces/Game";
import api from "../apiConfig";

export const apiGetGames = async () => {
    try {
        const tokens = await api().get('/games');
        return tokens.data.games;
    } catch (err) {
        return false;
    }
}

export const apiAddGame = async (game: GameRawI) => {
    try {
        const tokens = await api().post('/game', game);
        return tokens.data.games;
    } catch (err) {
        return false;
    }
}