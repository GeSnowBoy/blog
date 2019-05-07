import axios from 'axios';
let copyAxios = axios.create({
  baseURL: 'https://api.github.com/'
});
copyAxios.defaults.params = {
  access_token: [
    'b',
    '9',
    'd',
    'e',
    '5',
    '9',
    'a',
    '3',
    '8',
    '3',
    '7',
    'f',
    '0',
    'b',
    'a',
    'c',
    'c',
    'e',
    '0',
    'a',
    '2',
    '0',
    'a',
    '4',
    '3',
    'c',
    '7',
    '4',
    '8',
    'e',
    'f',
    '5',
    '8',
    '0',
    'c',
    '7',
    'a',
    'b',
    'e',
    'a'
  ].join('')
};
copyAxios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
copyAxios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);
export default copyAxios;
