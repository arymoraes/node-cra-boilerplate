import axios from 'axios';

const api = () => {
  const accesstoken = localStorage.getItem('token');

  return axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      Authorization: accesstoken ? accesstoken : '',
    },
  });
}

export default api;