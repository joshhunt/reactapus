import { createStore, combineReducers, applyMiddleware } from 'redux';

import createApiMiddleware from './apiMiddleware';
import * as reducers from 'app/reducers/index';

const reducer = combineReducers(reducers);

export default function(api, data) {
  const apiMiddleware = createApiMiddleware(api);
  const finalCreateStore = applyMiddleware(apiMiddleware)(createStore);

  return finalCreateStore(reducer, data);
}

