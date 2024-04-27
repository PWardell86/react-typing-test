import './App.css';
import React from 'react';
import { getUser } from './ServerAPI';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TypingTestPage from './pages/TypingTest/TypingTestPage';
import UserOptionsPage from './pages/UserOptions/UserOptionsPage';
import LeaderboardPage from './pages/Leaderboard/LeaderboardPage';
import MultiplayerPage from './pages/Multiplayer/MultiplayerPage';
import FeedbackModal from './components/FeedbackModal';
import UserContext from './UserContext';

class App extends React.Component {
  state = { user: null };
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      getUser(token)
        .then((response) => {
          const body = document.body;
          body.classList.remove('light-theme', 'dark-theme');
          document.body.classList.add(response.data.default_theme + '-theme');
          this.setState({ user: response.data });
        }).catch((error) => {
          localStorage.removeItem('token');
          console.log(error);
          return null;
        });
    }
  }

  render = () => {
    return (
      <UserContext.Provider value={this.state.user}>
      <Router>
        <Routes>
          <Route index element={<TypingTestPage />} />
          <Route path="/options" element={<UserOptionsPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="/multiplayer" element={<MultiplayerPage />} />
          <Route path="*" element={<h1>404 haha</h1>} />
        </Routes>
        <footer>
          <FeedbackModal />
        </footer>
      </Router>
      </UserContext.Provider>

    );
  }
}

export default App;
