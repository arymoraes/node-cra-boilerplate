import { redisClient } from "../index";
import { Token } from "../entities/Token"
import { fetchTokenFromPancakeswapApi } from "../controllers/TokenController";

const fetchAllTokenPrices = async () => {
    const tokens = await Token.find();
    tokens.forEach(async (token: Token) => {
        const updatedToken = await fetchTokenFromPancakeswapApi(null, token.contract);
        if (updatedToken) {
            redisClient.set(token.contract, updatedToken.price);
        }
    });
}

export default fetchAllTokenPrices;