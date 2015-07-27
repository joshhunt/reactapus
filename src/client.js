import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Location from 'react-router/lib/Location';
import createStore from './redux/create';
import ApiClient from './ApiClient';
import universalRouter from './universalRouter';

const history = new BrowserHistory();
const client = new ApiClient();

const dest = document.getElementById('content');
const store = createStore(client, window.__data);
const location = new Location(document.location.pathname, document.location.search);

const injectDevTools = ({viewComponent}) => {
  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
  return (
    <div>
      {viewComponent}
      <DebugPanel top right bottom key="debugPanel">
        <DevTools store={store} monitor={LogMonitor}/>
      </DebugPanel>
    </div>
  );
};

universalRouter(location, history, store)
  .then(({viewComponent}) => {
    let devViewComponent;

    if (__DEVTOOLS__) {
      devViewComponent = injectDevTools({viewComponent});
    }

    React.render(devViewComponent || viewComponent, dest);
  });


if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  const reactRoot = window.document.getElementById('content');

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
