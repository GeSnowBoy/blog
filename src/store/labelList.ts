import { easyReducer } from './blogList';

export default easyReducer(
  'label',
  {
    update(state, payload) {
      return payload;
    },
    add(state, payload) {
      return state;
    }
  },
  []
);
