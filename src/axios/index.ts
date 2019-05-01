import axios from 'axios';
let copyAxios = axios.create({
  baseURL: 'https://api.github.com/'
});
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
