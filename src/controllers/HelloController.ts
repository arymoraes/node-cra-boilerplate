import { Response, Request } from "express";
import HelloI from "../interfaces/HelloI";

export const sendHello = (req: Request, res: Response) => {
  try {
    const hello: HelloI = {
      message: "Hello World from our API!",
    };
    res.status(200).send(hello);
  } catch (error) {
    res.status(500).send(error);
  }
};
