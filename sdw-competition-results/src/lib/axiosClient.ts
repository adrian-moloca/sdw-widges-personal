import axios, { AxiosInstance } from 'axios';
import { getUsdmApiUrl } from 'config/apiConfig';
import { createContext } from 'react';
import { ConfigEnvironment } from 'types/WidgetConfig';
export const AxiosContext = createContext<AxiosInstance | null>(null);
export const createAxiosClient = (apiKey: string, environment: ConfigEnvironment) => {
  return axios.create({
    baseURL: getUsdmApiUrl(environment),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'SDW-API-Key': apiKey,
      'Accept-API-Version': 'resource=3.1, protocol=1.0',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    },
    timeout: 900000,
  });
};
