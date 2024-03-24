import './MainSection.css';
import StatsContainer from './StatsContainer';
import TestText from './TestText';
import React from 'react';
import { addScore, getParagraph } from '../ServerAPI';

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
    const testTextSpinny = document.getElementById('test-text-spinny');
    testTextSpinny.removeAttribute('hidden');
    getParagraph()
      .then((response) => {
        console.log(response.data);
        this.text = response.data;
        this.reset();
      }).catch((error) => {
        alert('Failed to get new paragraph.');
        console.log(error);
      }).finally(() => {
        testTextSpinny.setAttribute('hidden', true);
      });
  }

  onFinish = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
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
        <div>
          <TestText text={this.text} state={this.state} onFinish={this.onFinish} />
          <span id="test-text-spinny" className="spinner-border spinner-border-sm" role="status" aria-hidden="true" hidden />
        </div>

        <div className="buttons">
          <button className="btn-primary btn" onClick={this.reset}>Reset</button>
          <button className="btn-primary btn" onClick={this.setNewText}>New Text</button>
        </div>
      </div>
    );
  }

}

export default MainSection;