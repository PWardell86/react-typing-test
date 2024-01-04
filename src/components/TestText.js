import './TestText.css';
import React from 'react';

class TestText extends React.Component {
    currentChar = 0;

    isCharValid(char) {
        return char.charCodeAt() >= 32 && char.charCodeAt() <= 126;
    }

    checkAndHandleBackspace(event) {
        if (event.keyCode !== 8) return false;
        if (this.currentChar > 0) {
            document.getElementById(this.currentChar).classList.remove('current');
            this.currentChar--;
            document.getElementById(this.currentChar).classList.remove('correct');
            document.getElementById(this.currentChar).classList.remove('incorrect');
            document.getElementById(this.currentChar).classList.add('current');
        }
        return true;
    }

    checkAndHandleShift(event) {
        if (event.keyCode !== 16) return false;
        return true;
    }

    handleKeyDown = (event) => {
        if (event.key.length > 1) {
            if (this.checkAndHandleBackspace(event)) return;
            if (this.checkAndHandleShift(event)) return;
            return;
        }
        if (!this.isCharValid(event.key)) return;
        const char = this.props.text[this.currentChar];
        if (this.currentChar >= this.props.text.length) {
            return; //TODO: End the game
        }
        if (this.currentChar >= this.props.text.length - 1) return;
        if (event.key === char) {
            document.getElementById(this.currentChar).classList.add('correct');
        } else {
            document.getElementById(this.currentChar).classList.add('incorrect');
        }
        document.getElementById(this.currentChar).classList.remove('current');
        this.currentChar++;
        if (this.currentChar < this.props.text.length) {
            document.getElementById(this.currentChar).classList.add('current');
        }
    }

    render = () => {
        const testText = [];
        for (let char of this.props.text) {
            testText.push(<span id={testText.length}>{char}</span>);
        }
        return testText;
    }

    componentDidMount = () => {
        document.addEventListener('keydown', this.handleKeyDown);
    }
}

export default TestText;