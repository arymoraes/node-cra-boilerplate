import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import router from './routes/router';
import cors from 'cors';
import redis from 'redis';
import { Token } from './entities/Token';
import fetchAllTokenPrices from './scripts/fetchTokenPrices';
import { User } from './entities/User';
import { Game } from './entities/Game';
import { Investment } from './entities/Investment';

const app = express();
dotenv.config();

const corsConfig = {
  origin: [process.env.FRONTEND_URL],
};

app.use(bodyParser.json());
app.use(cors(corsConfig));
app.use(router);

var rtg = require("url").parse(process.env.REDIS_URL);
export const redisClient = redis.createClient(rtg.port, rtg.hostname);

(async () => {
   try {
     await createConnection({
       type: 'postgres',
       host: process.env.DB_HOST,
       port: 5432,
       username: process.env.DB_USERNAME,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME,
       entities: [Token, User, Game, Investment],
       synchronize: true, // DO NOT USE FOR PRODUCTION
     });
     app.listen(parseInt(process.env.PORT, 10), () => {
       console.log(`Server is up and listening on port ${process.env.PORT}.`);
     });
     setInterval(() => {
       fetchAllTokenPrices();
     }, 5 * 60 * 1000);
   } catch (err) {
     console.log(err);
   }
 })();
 
 export default app;