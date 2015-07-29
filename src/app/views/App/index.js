import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {createTransitionHook} from 'app/universalRouter';
import Navbar from 'app/components/Navbar';

if (__CLIENT__) require('./styles.scss');

class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {router, store} = this.context;
    router.addTransitionHook(createTransitionHook(store));
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>

        <div className="app">
          {this.props.children}
        </div>
      </div>
    );
  }
}

@connect(state => ({}))
export default class AppContainer {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  static fetchData() {
    const promises = [];
    return Promise.all(promises);
  }

  render() {
    return (
      <App>
        {this.props.children}
      </App>
    );
  }
}
