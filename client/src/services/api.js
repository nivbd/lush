import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:3002' });
const defaultHeaders = {
  'Content-Type': 'application/json',
};
const axiosConfig = {
  headers: defaultHeaders
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error.response.data;
  }
);

const axiosGet = ({ url }) => axiosInstance.get(url, axiosConfig);
const axiosPost = ({ url, data = {} }) =>
  axiosInstance.post(url, data, axiosConfig);

export const getUsers = () => {
  return axiosGet({ url: '/users' });
};

export const createUser = (data) => {
  return axiosPost({ url: '/users', data });
};
