import "./App.css";
import React from "react";
import { getUser } from "./ServerAPI";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TypingTestPage from "./components/TypingTestPage";
import UserOptionsPage from "./components/UserOptionsPage";
import LeaderboardPage from "./components/LeaderboardPage";
import FeedbackModal from "./components/FeedbackModal";
import FileUpload from "./components/FileUpload";

class App extends React.Component {
  state = { user: null };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token)
        .then((response) => {
          const body = document.body;
          body.classList.remove("light-theme", "dark-theme");
          document.body.classList.add(response.data.default_theme + "-theme");
          this.setState({ user: response.data });
        })
        .catch((error) => {
          localStorage.removeItem("token");
          console.log(error);
          return null;
        });
    }
  }

  render = () => {
    return (
      <Router>
        <Routes>
          <Route index element={<TypingTestPage user={this.state.user} />} />
          <Route
            path="/options"
            element={<UserOptionsPage user={this.state.user} />}
          />
          <Route
            path="/leaderboards"
            element={<LeaderboardPage user={this.state.user} />}
          />
          <Route path="/uploadFile" element={<FileUpload />} />
          <Route path="*" element={<h1>404 haha</h1>} />
        </Routes>
        <footer>
          <FeedbackModal />
        </footer>
      </Router>
    );
  };
}

export default App;
