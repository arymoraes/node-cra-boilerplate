import { GameI, GameRawI } from "../../../interfaces/Game";
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
        const newGame = await api().post('/game', game);
        return newGame.data.game;
    } catch (err) {
        return false;
    }
}

export const apiDeleteGame = async (game: GameI) => {
    try {
        const deletedGame = await api().delete(`/game/${game.id}`);
        if (deletedGame) {
            return game.id;
        }
        return false;
    } catch (err) {
        return false;
    }
}