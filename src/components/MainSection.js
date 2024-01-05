import './MainSection.css';
import StatsContainer from './StatsContainer';
import TestText from './TestText';
import React from 'react';
class MainSection extends React.Component {
  // TODO: Some way to get text dynamically
  text = "Lorem ipsum";
  state = {
    started: false,
    finished: false,
    correctChars: 0,
    totalChars: this.text.length,
    currentChar: 0
  }

  render() {
    return (
      <div id="main-section">
        <div className="header">
          <h1>Typing test</h1>
          <div id="test-info">Start typing to begin...</div>
        </div>
        <StatsContainer data={this.state} />
        <div className="test-container">
          <TestText text={this.text} state={this.state} />
        </div>

        <div className="buttons">
          <button id="reset-btn" className="button">Reset</button>
          <button id="new-text-btn" className="button">New Text</button>
        </div>
      </div>);
  }

}

export default MainSection;