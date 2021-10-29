import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const pancakeApi = () => {
  return axios.create({
    baseURL: process.env.PANCAKE_URL,
  });
}

export default pancakeApi;