import { ConfigEnvironment } from 'types/WidgetConfig';
import has from 'lodash/has';
export const getApiUrl = (environment: ConfigEnvironment): string => {
  switch (environment) {
    case 'production':
      return 'https://sdw-api.olympicchannel.com';
    case 'development':
      return 'https://sdw-api-dev.olympicchannel.com';
    case 'staging':
      return 'https://sdw-api-staging.olympicchannel.com';
    case 'live':
      return 'https://sdw-api-live.olympicchannel.com';
    default:
      throw new Error(`Unknown environment: ${environment}`);
  }
};

export const getUsdmApiUrl = (environment: ConfigEnvironment): string => {
  return `${getApiUrl(environment)}/usdm/v1`;
};
export const getUsdfApiUrl = (environment: ConfigEnvironment): string => {
  return `${getApiUrl(environment)}/usdf/v2`;
};
export const getMasterApiUrl = (environment: ConfigEnvironment): string => {
  return `${getApiUrl(environment)}/md`;
};
//  const tokenUrl =

export const buildMasterDataUrl = (url: string, params?: any): string => {
  const uri = url.indexOf('?') === -1 ? `${url}?` : url;
  if (params) {
    const queryParams = [];
    if (has(params, 'start')) {
      queryParams.push(`start=${params.start}`);
    }
    if (has(params, 'rows')) {
      queryParams.push(`rows=${params.rows}`);
    }
    if (has(params, 'languageCode')) {
      queryParams.push(`languageCode=${params.languageCode}`);
    }
    if (has(params, 'search')) {
      queryParams.push(`search=${params.search}`);
    }
    return `${uri}${queryParams.join('&')}`;
  }
  return uri;
};
export const buildUrlId = (url: string, id: string): string => {
  return `${url}/${id}`;
};
export const apiConfig = {
  clientId: 'sdw_ui',
  EVENT_BREAKDOWN: '/events/{0}/breakdown',
  EVENT_EXTENDED: '/events/{0}/extended',
  version: import.meta.env.VITE_VERSION ?? '1.9.1',
  disciplinesIconEndPoint:
    'https://gstatic.olympics.com/s1/t_1-1_64/static/light/pictograms/2022/{0}.svg',
  flagIso2EndPoint: 'https://gstatic.olympics.com/s1/f_auto//static/flag/4x3/{0}.svg',
  flagIso3EndPoint: 'https://gstatic.olympics.com/s3/noc/oly/3x2/{0}.png',
};
