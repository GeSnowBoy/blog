import { easyReducer } from './blogList';

export default easyReducer(
  'github',
  {
    change(state, payload) {
      return payload;
    }
  },
  {
    owner: 'GeSnowBoy',
    repo: 'blog'
  }
);
// markedjs/marked
