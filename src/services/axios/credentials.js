import axios from 'axios';

const AxiosCredentials = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export default AxiosCredentials;
