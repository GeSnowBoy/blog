import ajax from './index';
import store from '../store';
import { AxiosRequestConfig } from 'axios';
function getUrl(url, obj = {}) {
  obj = Object.assign({}, obj, store.getState().github);
  return url.replace(/:[^\/]*/g, (s, a, b) => {
    return obj[s.substr(1)];
  });
}

const API = {
  issuse: {
    getAll(config?: AxiosRequestConfig) {
      return ajax.get(getUrl('/repos/:owner/:repo/issues'), config);
    },
    getOne(number: { issue_number: string }, config?: AxiosRequestConfig) {
      return ajax.get(
        getUrl('/repos/:owner/:repo/issues/:issue_number', number),
        config
      );
    }
  }
};

export default API;
