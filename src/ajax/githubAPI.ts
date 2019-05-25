import { AxiosRequestConfig } from 'axios';
import ajax from './index';
import store from '../store/index';
import { string } from 'prop-types';

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
    },
    getDetail() {
      return ajax.get(getUrl('/repos/:owner/:repo/milestones'));
    }
  },
  label: {
    getAll(config?: AxiosRequestConfig) {
      return ajax.get(getUrl('/repos/:owner/:repo/labels'), config);
    }
  },
  repository: {
    get(config?: AxiosRequestConfig) {
      return ajax.get(getUrl('/repos/:owner/:repo'), config);
    }
  },
  comment: {
    get(issueIds: string | number, config?: AxiosRequestConfig) {
      return ajax.get(
        getUrl('/repos/:owner/:repo/issues/:issue_number/comments', {
          issue_number: issueIds
        }),
        config
      );
    }
  },
  V4: {
    getTotalNum() {
      let req = store.getState().github;
      return ajax.post('graphql', {
        query: `{
          repository(owner: "${req.owner}", name: "${req.repo}") {
            name
            labels(first:100){
              nodes{
                id
                color
                name 
                url
                issues{
                  totalCount
                }
                
              }
              totalCount
            }
            issues {
              totalCount
            }
          }
        }`
      });
    }
  }
};

export default API;
