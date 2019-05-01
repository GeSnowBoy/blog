import { createStore, combineReducers } from 'redux';
import blogList from './blogList';
import github from './github';
const Store = createStore(
  combineReducers({
    blogList,
    github
  })
);
export default Store;
