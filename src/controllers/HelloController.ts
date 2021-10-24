import { Response, Request } from 'express';
import HelloI from '../interfaces/HelloI';

export const sendHello = (req: Request, res: Response) => {
   const hello: HelloI = {
      message: 'Hello World from our API!',
   }
  res.status(200).send(hello);
}