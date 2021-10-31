import { Response, Request } from "express";
import { Game } from "../entities/Game";

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find();

    res.status(200).send({
      games
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addGame = async (req: Request, res: Response) => {
  try {
    const { name, url, img } = req.body;

    const newGame = Game.create({
      name, url, img
    });

    await newGame.save();

    res.status(200).send({
      game: newGame,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Game.delete(id);

    res.status(200).send({
      gameId: id,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
