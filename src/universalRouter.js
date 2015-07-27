import React from 'react';
import Router from 'react-router';
import routes from './views/routes';
import { Provider } from 'react-redux';

const getFetchData = (component) => {
  return component.fetchData || (component.DecoratedComponent && component.DecoratedComponent.fetchData);
};

export function createTransitionHook(store) {
  return (nextState, transition, callback) => {
    const stateDataThing = nextState.branch
      .map(route => route.component)
      .filter(component => {
        return getFetchData(component);
      })
      .map(getFetchData)
      .map(fetchData => {
        return fetchData(store, nextState.params);
      });

    Promise.all(stateDataThing)
      .then(() => {
        callback(); // can't just pass callback to then() because callback assumes first param is error
      })
      .catch(callback);
  };
}

export default function universalRouter(location, history, store) {
  return new Promise((resolve, reject) => {
    Router.run(routes, location, [createTransitionHook(store)], (err, initialState, transition = {}) => {

      if (err) {
        return reject(err);
      }

      if (transition.redirectInfo) {
        return resolve({transition, isRedirect: true});
      }

      // Only on the client side
      if (history) {
        initialState.history = history;
      }

      const viewComponent = (
        <Provider store={store} key="provider">
          {() => <Router {...initialState} children={routes}/>}
        </Provider>
        );

      return resolve({viewComponent, isRedirect: false});
    });
  });
}
