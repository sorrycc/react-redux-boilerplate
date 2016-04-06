import './index.html';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import reducers from '../reducers/index';
import sagas from '../sagas/index';
import App from '../containers/App';

//////////////////////
// Store

const initialState = {};
const enhancer = compose(
  applyMiddleware(createSagaMiddleware(sagas)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(combineReducers({
  ...reducers,
  routing: routerReducer,
}), initialState, enhancer);

//////////////////////
// Routes

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={App} />
  </Router>

//////////////////////
// Entry

const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('root')
);
