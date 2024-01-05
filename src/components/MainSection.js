import './MainSection.css';
import StatsContainer from './StatsContainer';
import TestText from './TestText';
import React from 'react';

class MainSection extends React.Component {
  // TODO: Some way to get text dynamically
  text = "Hippos inhabit rivers, lakes, and mangrove swamps. Territorial bulls each preside over a stretch of water and a group of five to thirty cows and calves. Mating and birth both occur in the water. During the day, hippos remain cool by staying in water or mud, emerging at dusk to graze on grasses. While hippos rest near each other in the water, grazing is a solitary activity and hippos typically do not display territorial behaviour on land.";
  DEFAULT = {
    started: false,
    finished: false,
    correctChars: 0,
    totalChars: this.text.length,
    currentChar: 0
  }
  state = {...this.DEFAULT}

  reset = () => {
    this.setState({...this.DEFAULT});
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
          <button id="reset-btn" className="button" onClick={this.reset}>Reset</button>
          <button id="new-text-btn" className="button">New Text</button>
        </div>
      </div>
    );
  }

}

export default MainSection;