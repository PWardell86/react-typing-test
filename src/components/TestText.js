import './TestText.css';
import React from 'react';
import PropTypes from 'prop-types';

class TestText extends React.Component {
  myRef = React.createRef();

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.getElementById('test-text').focus();
  }

  handleFocus = () => {
    this.setState();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleBlur = () => {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render = () => {
    const testText = [];
    for (let char of this.props.text) {
      testText.push(<span id={testText.length}>{char}</span>);
    }
    testText.push(<span id={testText.length}>{''}</span>);
    return <div id="test-text" tabIndex="-1" ref={this.myRef} onFocus={this.handleFocus} onBlur={this.handleBlur}>{testText}</div>;
  }

  handleKeyDown = (event) => {
    if (this.props.state.finished) return;
    // If we see Backspace, handle it. If we see any other special key, ignore it.
    if (event.key.length > 1) {
      if (event.key === "Backspace") {
        this.handleBackspace(event);
      }
      return;
    }
    if (event.key === ' ') {
      event.preventDefault();
    }


    // If we see a character that wouldn't appear in some text, ignore it.
    if (!this.isCharValid(event.key)) return;
    // Start the test if it hasn't started yet
    if (!this.props.state.started) this.startTest();

    const expectedChar = this.props.text[this.props.state.currentIndex];
    const currentElement = document.getElementById(this.props.state.currentIndex);

    // Stop if we reached the end
    if (this.props.state.currentIndex >= this.props.text.length - 1) {
      this.props.state.finished = true;
      this.props.onFinish();
    }

    // If not, update the element if the user pressed the proper key
    this.setCharacterCorrectness(event, expectedChar, currentElement);
    this.moveToNextCharacter(currentElement);
  }

  startTest() {
    this.props.state.started = true;
    this.props.state.startTime = Date.now();
  }

  setCharacterCorrectness(event, expectedChar, currentElement) {
    if (event.key === expectedChar) {
      currentElement.classList.add('correct');
      this.props.state.correctChars++;
    } else {
      currentElement.classList.add('incorrect');
    }
  }

  moveToNextCharacter(currentElement) {
    currentElement.classList.remove('current');
    this.props.state.currentIndex++;
    if (this.props.state.currentIndex < this.props.text.length) {
      document.getElementById(this.props.state.currentIndex).classList.add('current');
    }
  }

  isCharValid(char) {
    return char.charCodeAt() >= 32 && char.charCodeAt() <= 126;
  }

  handleBackspace(event) {
    if (this.props.state.currentIndex > 0) {
      let currentSpan = document.getElementById(this.props.state.currentIndex);
      currentSpan.classList.remove('current');

      this.props.state.currentIndex--;
      currentSpan = document.getElementById(this.props.state.currentIndex);
      if (currentSpan.classList.contains('correct')) {
        this.props.state.correctChars--;
      }
      currentSpan.classList.remove('correct');
      currentSpan.classList.remove('incorrect');
      currentSpan.classList.add('current');
    }
  }
}

TestText.propTypes = {
  text: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
}

export default TestText;