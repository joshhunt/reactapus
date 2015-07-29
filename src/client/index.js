import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Location from 'react-router/lib/Location';

import createStore from 'app/redux/create';
import ApiClient from 'app/ApiClient';
import universalRouter from 'app/universalRouter';

const history = new BrowserHistory();
const api = new ApiClient();

const reactRoot = document.getElementById('content');
const store = createStore(api, window.__data);
const location = new Location(document.location.pathname, document.location.search);

universalRouter(location, history, store)
  .then(({viewComponent}) => {
    React.render(viewComponent, reactRoot);
  });

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
