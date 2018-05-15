import queryString from 'query-string';

let parsedQuery = null;

const getQueryParam = (name, defaultValue) => {
  if (!parsedQuery) {
    parsedQuery = queryString.parse(window.location.hash);
  }

  if (name in parsedQuery) {
    return parsedQuery[name];
  }

  return defaultValue;
};

export default getQueryParam;
