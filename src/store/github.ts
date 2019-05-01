import { easyReducer } from './blogList';

export default easyReducer(
  'github',
  {
    change(state, payload) {
      return payload;
    }
  },
  {
    owner: 'markedjs',
    repo: 'marked'
  }
);
// markedjs/marked
