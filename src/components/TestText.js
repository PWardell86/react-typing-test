import './TestText.css';
import React from 'react';
import PropTypes from 'prop-types';
class TestText extends React.Component {

    isCharValid(char) {
        return char.charCodeAt() >= 32 && char.charCodeAt() <= 126;
    }

    checkAndHandleBackspace(event) {
        if (event.keyCode !== 8) return false;
        if (this.props.state.currentChar > 0) {
            let currentSpan = document.getElementById(this.props.state.currentChar);
            currentSpan.classList.remove('current');
            this.props.state.currentChar--;
            currentSpan = document.getElementById(this.props.state.currentChar);
            if (currentSpan.classList.contains('correct')) {
                this.props.state.correctChars--;
            }
            currentSpan.classList.remove('correct');
            currentSpan.classList.remove('incorrect');
            currentSpan.classList.add('current');
        }
        return true;
    }

    checkAndHandleShift(event) {
        return event.keyCode === 16;
    }

    handleKeyDown = (event) => {
        // Check for Backspace and Shift. Ignore other keys like Ctrl, Alt, etc.
        if (event.key.length > 1) {
            if (this.checkAndHandleBackspace(event)) return;
            if (this.checkAndHandleShift(event)) return;
            return;
        }
        
        if (!this.isCharValid(event.key)) return;

        // Start the game if it hasn't started yet
        if (!this.props.state.started) {
            this.props.state.started = true;
            this.props.state.startTime = Date.now();
        }
        const char = this.props.text[this.props.state.currentChar];
        const currentElement = document.getElementById(this.props.state.currentChar);

        // Stop if we reached the end
        if (this.props.state.currentChar >= this.props.text.length) return;

        // If not, update the element if the user pressed the proper key
        if (event.key === char) {
            currentElement.classList.add('correct');
            this.props.state.correctChars++;
        } else {
            currentElement.classList.add('incorrect');
        }
        // Move to the next character
        currentElement.classList.remove('current');
        this.props.state.currentChar++;
        if (this.props.state.currentChar < this.props.text.length) {
            document.getElementById(this.props.state.currentChar).classList.add('current');
        }
    }

    render = () => {
        const testText = [];
        for (let char of this.props.text) {
            testText.push(<span id={testText.length}>{char}</span>);
        }
        testText.push(<span id={testText.length}>{' '}</span>);
        return testText;
    }

    componentDidMount = () => {
        document.addEventListener('keydown', this.handleKeyDown);
    }
}

TestText.propTypes = {
    text: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired
}

export default TestText;