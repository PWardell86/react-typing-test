import './MainSection.css';
import Statistic from './Statistic';
import TestText from './TestText';

function MainSection() {
    // TODO: Some way to get text dynamically
    const text = "Lorem ipsum ";
    TestText.currentChar = 1;
    return (
        <div id="main-section">
            <div className="header">
                <h1>Typing test</h1>
                <div id="test-info">Start typing to begin...</div>
            </div>
            <div className="stats-container">
                <Statistic id="accuracy" label="Accuracy" value="100%" />
                <Statistic id="wpm" label="WPM" value="0" />
                <Statistic id="timer" label="" value="0.0s" />
            </div>
            <div className="test-container">
                <TestText text={text} />
            </div>

            <div className="buttons">
                <button id="reset-btn" className="button">Reset</button>
                <button id="new-text-btn" className="button">New Text</button>
            </div>
        </div>
    );
}

export default MainSection;