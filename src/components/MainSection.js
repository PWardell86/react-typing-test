import './MainSection.css';
import StatsContainer from './StatsContainer';
import TestText from './TestText';
import React from 'react';
import sampleText from '../paragraphs';
import { addScore } from '../ServerAPI';

class MainSection extends React.Component {
  text = "";
  DEFAULT = {
    started: false,
    finished: false,
    correctChars: 0,
    totalChars: 0,
    currentIndex: 0,
    total_time: 0,
  };
  state = { ...this.DEFAULT };


  reset = () => {
    this.setState({ ...this.DEFAULT, totalChars: this.text.length });
    this.resetText();
  }

  resetText() {
    const spans = document.querySelectorAll('#test-text > span');
    spans.forEach(span => {
      span.classList.remove('correct');
      span.classList.remove('incorrect');
      span.classList.remove('current');
    });
    // Set the first span to current
    document.querySelector('#test-text > span').classList.add('current');
  }

  setNewText = () => {
    const index = Math.floor(Math.random() * sampleText.length);
    this.text = sampleText[index];
    this.reset();
  }

  onFinish = () => {
    const wpm = this.state.correctChars / 5 / (this.state.elapsed_time / 60);

    addScore(localStorage.getItem('token'), {
      wpm: wpm === Infinity ? -1 : wpm,
      accuracy: 100 * (this.state.correctChars / this.state.totalChars),
      elapsed_time: (Date.now() - this.state.startTime) / 1000
    })
      .then(() => {
        alert('Saved your score');
      }).catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.setNewText();
  }

  render() {
    if (this.state.finished) {
      this.onFinish();
    }
    return (
      <div id="main-section">
        <div className="header">
          <div id="test-info">Start typing to begin...</div>
        </div>
        <StatsContainer data={this.state} />
        <TestText text={this.text} state={this.state} onFinish={this.onFinish} />
        <div className="buttons">
          <button className="btn-primary btn" onClick={this.reset}>Reset</button>
          <button className="btn-primary btn" onClick={this.setNewText}>New Text</button>
        </div>
      </div>
    );
  }

}

export default MainSection;