import queryString from 'query-string';

export const getQueryParams = () => {
  return queryString.parse(window.location.hash);
};
