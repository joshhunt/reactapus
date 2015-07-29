import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {isLoaded} from 'app/reducers/shows';
import * as showActions from 'app/actions/showActions';
import Show from 'app/components/Show';

if (__CLIENT__) {
  require('./styles.scss');
}


class Shows extends Component {
  static propTypes = {
    shows: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired
  };

  render() {
    const {shows, error, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';

    if (loading) {
      refreshClassName += ' fa-spin';
    }

    // This doesnt seem like the best way to do this...
    let bodyEle;
    if (!error) {
      bodyEle = shows.map((show) => {
        return <Show show={show}></Show>;
      });
    } else {
      bodyEle = error ? <p>Error: {error}</p> : null;
    }

    return (
      <div className="shows">

        <div className="container-fluid clearfix">
          <div className="pull-left">
            <h1>Shows</h1>
          </div>

          <div className="pull-right">
            <button className="refresh-btn btn btn-success" onClick={load}>
              <i className={refreshClassName}/> {' Reload Shows'}
            </button>
          </div>
        </div>

        {bodyEle}

      </div>
    );
  };
}

@connect(state => ({
  shows: state.shows.shows,
  error: state.shows.error,
  loading: state.shows.loading
}))
export default class ShowsContainer {
  static propTypes = {
    shows: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store) {
    if (!isLoaded(store.getState())) {
      return store.dispatch(showActions.load());
    }
  }

  render() {
    const { shows, error, loading, dispatch } = this.props;
    return (
      <Shows shows={shows} error={error}
             loading={loading} {...bindActionCreators(showActions, dispatch)}/>
    );
  }
}
