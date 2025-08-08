import has from 'lodash/has';
import size from 'lodash/size';

export const buildSearchUrl = (url: string, params?: any): string => {
  const uri = url.indexOf('?') === -1 ? `${url}?` : url;
  if (params) return `${uri}${processSearchPayload(params)}`;

  return uri;
};

export const processSearchPayload = (params: any): string => {
  const queryParams = [];
  if (has(params, 'pagination') && size(params.pagination) > 0) {
    queryParams.push(`start=${params.pagination.start}`);
    if (params.pagination.rows) {
      queryParams.push(`rows=${params.pagination.rows}`);
    }
  }

  if (has(params, 'search') && (params.search?.length ?? 0) > 0) {
    queryParams.push(`search=${params.search}`);
  }

  return queryParams.join('&');
};
