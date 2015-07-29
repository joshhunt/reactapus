import React, {Component, PropTypes} from 'react';

if (__CLIENT__) require('./styles.scss');

export default class Show extends Component {
  static propTypes = {
    show: PropTypes.object
  }

  render() {
    const {show} = this.props;

    return (
      <div className="show" key={show.slug}>
        <img className="show__img" src={show.image.showImage}></img>

        <div className="show__details">
          <h3>{show.title}</h3>
        </div>
      </div>
    );
  }
}
