import { createStore, combineReducers } from 'redux';
import blogList from './blogList';
import github from './github';
import labels from './labelList';
const Store = createStore(
  combineReducers({
    blogList,
    github,
    labels
  })
);
export default Store;
