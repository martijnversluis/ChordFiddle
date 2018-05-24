import queryString from 'query-string';

export const getQueryParams = () => queryString.parse(window.location.hash);

export const setQueryParams = (params) => {
  window.location.hash = queryString.stringify(params);
};
