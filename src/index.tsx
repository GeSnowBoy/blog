import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store';
import 'antd/dist/antd.css';

import {
  Switch,
  HashRouter as Router,
  Route,
  RouteComponentProps
} from 'react-router-dom';
const App = (
  <Provider store={Store}>
    <Router>
      <React.Suspense fallback={<div>加载中...</div>}>
        <Switch>
          <Route
            path="/"
            exact
            component={React.lazy(() => import('./pages/index/index'))}
          />
          <Route
            path="/detail/:id"
            component={React.lazy(() => import('./pages/detail/index'))}
          />
        </Switch>
      </React.Suspense>
    </Router>
  </Provider>
);
ReactDOM.render(App, document.querySelector('#app'));
