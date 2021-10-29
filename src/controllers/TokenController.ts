import { Response, Request } from "express";
import { redisClient } from "../index";
import pancakeApi from "../api/pancakeApi";
import { Token } from "../entities/Token";
import { AuthRequest } from "../middleware/auth";
import { getConnection, getRepository } from "typeorm";
import errorHandler from "../utils/errorHandler";
import { User } from "../entities/User";

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
        const tokenPrice = parseFloat(cachedData[index]);
        const toFixedValue = tokenPrice < 5 ? 4 : 2 ;
        return {
          ...token,
          price: tokenPrice.toFixed(toFixedValue),
        }
      });
      res.status(200).send(updatedTokens);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserTokens = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findOne({ where: {id: req.user.id}, relations: ['tokens'] });
    const userTokens = user.tokens;
    const tokensContracts: string[] = userTokens.map((token: Token) => {
      return token.contract;
    })
    redisClient.mget(tokensContracts, (err, cachedData) => {
      const updatedTokens = userTokens.map((token: Token, index: number) => {
        const tokenPrice = parseFloat(cachedData[index]);
        const toFixedValue = tokenPrice < 5 ? 4 : 2 ;
        return {
          ...token,
          price: tokenPrice.toFixed(toFixedValue),
        }
      });
      res.status(200).send(updatedTokens);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addUserToken = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.body;
    const { user } = req;

    await getConnection()
      .createQueryBuilder()
      .relation(Token, 'users')
      .of(id)
      .add(user.id)
      .catch((err) => {
        if (err) {
          return errorHandler(res, 400, 'Error');
        }
      });

    return res.status(200).send({
      user: user.id,
      token: id,
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