import Statistic from "./Statistic";
import React from "react";
import PropTypes from 'prop-types';
import './StatsContainer.css';

class StatsContainer extends React.Component {
  state = {
    accuracy: 100,
    wpm: 0,
    timer: 0,
  }

  render() {
    return (
      <div className="stats-container">
        <Statistic id="accuracy" label="Accuracy" value={this.state.accuracy} />
        <Statistic id="wpm" label="WPM" value={this.state.wpm} />
        <Statistic id="timer" label="" value={this.state.timer} />
      </div>
    );
  }

  componentDidMount() {
    window.setInterval(this.updateAll, 100);
  }

  updateAll = () => {
    if (!this.props.data.started || this.props.data.finished) return;
    this.updateAccuracy();
    this.updateWPM();
    this.updateTime();
  }

  updateAccuracy = () => {
    const correct = this.props.data.correctChars;
    const soFar = this.props.data.currentChar;
    const accuracy = (correct / soFar * 100).toFixed(0);
    this.setState({ accuracy: accuracy });
  }

  updateWPM = () => {
    const correct = this.props.data.correctChars;

    this.setState(prevState => (
      {
        wpm: (correct / 5 / prevState.timer * 60).toFixed(0)
      })
    );
  }

  updateTime = () => {
    const newTime = (Date.now() - this.props.data.startTime) / 1000;
    this.setState({ timer: newTime.toFixed(1) });
  }
}

StatsContainer.propTypes = {
  data: PropTypes.object
}
export default StatsContainer;