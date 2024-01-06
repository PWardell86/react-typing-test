import './MainSection.css';
import StatsContainer from './StatsContainer';
import TestText from './TestText';
import React from 'react';
import sampleText from '../paragraphs';

class MainSection extends React.Component {
  text = "";
  DEFAULT = {
    started: false,
    finished: false,
    correctChars: 0,
    totalChars: 0,
    currentIndex: 0,
  };
  state = { ...this.DEFAULT };

  reset = () => {
    this.setState({ ...this.DEFAULT, totalChars: this.text.length});
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

  componentDidMount() {
    this.setNewText();
  }

  render() {
    return (
      <div id="main-section">
        <div className="header">
          <h1>Typing test</h1>
          <div id="test-info">Start typing to begin...</div>
        </div>
        <StatsContainer data={this.state} />
        <div id="test-text" className="test-container">
          <TestText text={this.text} state={this.state} />
        </div>

        <div className="buttons">
          <div id="reset-btn" className="button" onClick={this.reset}>Reset</div>
          <div id="new-text-btn" className="button" onClick={this.setNewText}>New Text</div>
        </div>
      </div>
    );
  }

}

export default MainSection;