import { Response, Request } from "express";
import pancakeApi from "../api/pancakeApi";
import { Token } from "../entities/Token";

export const addToken = async (req: Request, res: Response) => {
  try {
    const { contract } = req.body;

    // TODO: Check pancakeswap API to see if token exists.
    const validToken = await fetchTokenFromPancakeswapApi(res, contract);

    if (validToken) {
      const { name, symbol } = validToken;
      const token = Token.create({
        name, symbol, contract
      });
      await token.save();
      res.status(200).send(token);
    }

  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchTokenFromPancakeswapApi = async (res: Response, contract: string) => {
  try {
    const token = (await pancakeApi().get(`/tokens/${contract}`)).data.data;
    return token;
  } catch {
    res.status(404).send({ error: 'Token not found' });
  }
}