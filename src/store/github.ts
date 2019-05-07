import { easyReducer } from './blogList';
import { parseQueryString } from '../tools';
let query = parseQueryString(location.hash);
export default easyReducer(
  'github',
  {
    change(state, payload) {
      return payload;
    }
  },
  {
    owner: query.owner || 'GeSnowBoy',
    repo: query.blog || 'blog'
  }
);
// markedjs/marked  isaaxite/blog
