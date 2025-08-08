import axios, { AxiosInstance } from 'axios';
import { buildMasterDataUrl, getUsdmApiUrl } from 'config/apiConfig';
import { buildSearchUrl, Logger } from 'helpers';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { EntityType, MetadataModel } from 'models/model';
import { store } from 'store';
import { useModelConfig } from './useModelConfig';
import { fetchAccessToken } from 'store/authSlice';

const useApiService = () => {
  const config = useWidgetConfig();
  const { getConfig } = useModelConfig();

  const api: AxiosInstance = axios.create({
    baseURL: getUsdmApiUrl(config.environment),
    responseType: 'json',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      'Accept-API-Version': 'resource=3.1, protocol=1.0',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-cache',
    },
    timeout: 15 * 60 * 1000, // Wait for 15 minutes before timing out
  });

  const apiService: AxiosInstance = axios.create({
    baseURL: getUsdmApiUrl(config.environment),
    responseType: 'json',
    headers: {
      accept: '*/*',
      origin: 'x-requested-with',
      'Content-Type': 'application/json',
      'Accept-API-Version': 'resource=3.1, protocol=1.0',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    },
    timeout: 15 * 60 * 1000, // Wait for 15 minutes before timing out
  });

  const setAuthHeader = (config: any) => {
    const state = store.getState().auth;
    const token = state.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  const ensureToken = async () => {
    const state = store.getState().auth;
    const now = Date.now();

    if (!state.token || (state.expiresAt && now >= state.expiresAt)) {
      // Dispatch the action to fetch a new token
      await store.dispatch(fetchAccessToken(config));
    }
  };

  api.interceptors.request.use(async (config) => {
    await ensureToken(); // Ensure token is available before request
    return setAuthHeader(config); // Set Authorization header after ensuring the token
  });

  apiService.interceptors.request.use(async (config) => {
    await ensureToken(); // Ensure token is available before request
    return setAuthHeader(config); // Set Authorization header after ensuring the token
  });

  // Now API calls like get, post, etc., will automatically use the token from the store
  const getMetadata = async (type: EntityType): Promise<{ [key: string]: MetadataModel }> => {
    try {
      const url = `${getConfig(type).apiNode}/search/metadata`;
      const response = await api.get(url);
      return response.data as { [key: string]: MetadataModel };
    } catch (error) {
      Logger.error(`Error in GET request: ${error}`);
    }
    return {};
  };

  const getMasterData = async (url: string, payload?: any): Promise<any> => {
    try {
      const response = await api.get(buildMasterDataUrl(url, payload));
      return response.data;
    } catch (error) {
      Logger.error(`Error in GET Master Data request: ${error}`);
    }
    return {} as any;
  };

  const fetch = async (url: string): Promise<any> => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      Logger.error(`Error in FETCH request: ${error}`);
      return null;
    }
  };

  const post = async (url: string, payload?: any): Promise<any> => {
    try {
      const response = await api.post(url, payload);
      return response.data;
    } catch (error) {
      Logger.error(`Error in POST request: ${error}`);
      throw error;
    }
  };

  const downloadFile = async (url: string, filename: string): Promise<void> => {
    try {
      const response = await api.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      Logger.error(`Error in downloading the file ${filename}: ${error}`);
    }
  };

  const search = async (url: string, payload?: any): Promise<any> => {
    try {
      const finalPayload = payload
        ? { sort: payload.sort, query: payload.query, ...payload.extendedFilters }
        : {};
      const response = await api.post(buildSearchUrl(url, payload), finalPayload);
      return response.data;
    } catch (error) {
      Logger.error(`Error in SEARCH request: ${error}`);
      throw error;
    }
  };
  return {
    api,
    fetch,
    post,
    getMetadata,
    getMasterData,
    downloadFile,
    search,
  };
};

export default useApiService;
