import { Response, Request } from "express";
import { redisClient } from "../index";
import pancakeApi from "../api/pancakeApi";
import { Token } from "../entities/Token";

export const addToken = async (req: Request, res: Response) => {
  try {
    const { contract } = req.body;

    // TODO: Check pancakeswap API to see if token exists.
    const validToken = await fetchTokenFromPancakeswapApi(res, contract);

    if (validToken) {
      const { name, symbol, price } = validToken;
      const token = Token.create({
        name, symbol, contract
      });
      redisClient.set(contract, price);
      await token.save();
      res.status(200).send(token);
    }

  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTokens = async (req: Request, res: Response) => {
  try {
    const tokens = await Token.find({
      skip: 0,
      take: 10,
    });
    const tokensContracts: string[] = tokens.map((token: Token) => {
      return token.contract;
    })
    redisClient.mget(tokensContracts, (err, cachedData) => {
      const updatedTokens = tokens.map((token: Token, index: number) => {
        return {
          ...token,
          price: parseFloat(cachedData[index]).toFixed(4),
        }
      });
      res.status(200).send(updatedTokens);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const fetchTokenFromPancakeswapApi = async (res: Response, contract: string) => {
  try {
    const token = (await pancakeApi().get(`/tokens/${contract}`)).data.data;
    return token;
  } catch {
    if (res) {
      res.status(404).send({ error: 'Token not found' });
    }
    return false;
  }
}