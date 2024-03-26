import Statistic from "./Statistic";
import React from "react";
import PropTypes from 'prop-types';
import './StatsContainer.css';

class StatsContainer extends React.Component {
  state = {
    accuracy: 100,
    wpm: 0,
    timer: 0
  }

  render() {
    return (
      <div className="stats-container">
        <Statistic id="accuracy" label="Accuracy" value={this.state.accuracy.toFixed(0).toString()} />
        <Statistic id="wpm" label="WPM" value={this.state.wpm.toFixed(0).toString()} />
        <Statistic id="timer" label="" value={this.state.timer.toFixed(1).toString() + "s"} />
      </div>
    );
  }

  componentDidMount() {
    window.setInterval(this.updateAll, 100);
  }

  updateAll = () => {
    if (!this.props.data.started) return;
    if (this.props.data.finished) return;
    this.updateAccuracy();
    this.updateWPM();
    this.updateTime();
  }

  updateAccuracy = () => {
    const correct = this.props.data.correctChars;
    const soFar = this.props.data.currentIndex;
    const accuracy = (correct / soFar * 100);
    this.setState({ accuracy: accuracy });
    this.props.data.accuracy = accuracy;
  }

  updateWPM = () => {
    const correct = this.props.data.correctChars;
    const calculated_wpm = (correct / 5 / this.props.data.elapsed_time * 60);
    this.setState({ wpm: calculated_wpm });
    this.props.data.wpm = calculated_wpm;
  }

  updateTime = () => {
    const newTime = (Date.now() - this.props.data.startTime) / 1000;
    this.setState({ timer: newTime });
    this.props.data.elapsed_time = newTime;
  }
}

StatsContainer.propTypes = {
  data: PropTypes.object
}

export default StatsContainer;