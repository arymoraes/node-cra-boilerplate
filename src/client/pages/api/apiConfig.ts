import axios from 'axios';

const api = () => {
  return axios.create({
    baseURL: 'http://localhost:4000',
  });
}

export default api;