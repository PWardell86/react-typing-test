import PropTypes from 'prop-types';
import './Statistic.css';
import React from 'react';

class Statistic extends React.Component {
  render() {
    const label = this.props.label ? this.props.label + ': ' : '';
    return (
      <div className="statistic">
        <div className="label">{label}</div>
        <div className="value">{this.props.value}</div>
      </div>
    );
  }
}

Statistic.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

export default Statistic;