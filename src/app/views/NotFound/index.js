import React, {Component} from 'react';


if (__CLIENT__) {
  require('./styles.scss');
}

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    );
  }
}
