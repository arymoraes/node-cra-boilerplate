import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import router from './routes/router';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(router);

(async () => {
   try {
     await createConnection({
       type: 'postgres',
       host: process.env.DB_HOST,
       port: 5432,
       username: process.env.DB_USERNAME,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME,
       entities: [],
       synchronize: true, // DO NOT USE FOR PRODUCTION
     });
     app.listen(parseInt(process.env.PORT, 10), () => {
       console.log(`Server is up and listening on port ${process.env.PORT}.`);
     });
   } catch (err) {
     console.log(err);
   }
 })();
 
 export default app;