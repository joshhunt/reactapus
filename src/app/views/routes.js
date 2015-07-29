import React from 'react';
import {Route} from 'react-router';

import App from './App';
import Home from './Home';
import Shows from './Shows';
import NotFound from './NotFound';

export default (
    <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/shows" component={Shows} />

        <Route path="*" component={NotFound} />
    </Route>
);
