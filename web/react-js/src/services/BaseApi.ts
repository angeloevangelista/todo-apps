import axios, { AxiosInstance } from 'axios';

const BaseApi = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
  });

  return api;
};

export { BaseApi };
