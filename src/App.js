import './App.css';
import React from 'react';
import FeedbackModal from './components/FeedbackModal';
import MainSection from './components/MainSection';
import MainNavbar from './components/MainNavbar';
import UserStats from './components/UserStats';
import { getUser } from './ServerAPI';

class App extends React.Component {
  state = { user: null };
  token = localStorage.getItem('token');

  componentDidMount() {
    if (this.token) {
      getUser(this.token)
        .then((response) => {
          this.setState({ user: response.data.user[3] });
        }).catch((error) => {
          console.log(error);
        });
    }
  }
  render = () => {
    return (
      <div>
        <div id="game-section">
          <MainNavbar user={this.state.user} />
          <MainSection />
        </div>
        {/* {this.state.user && */}
          <div>
            <div className="section-sep" />
            <UserStats token={this.token} />
          </div>
        {/* } */}
        <footer>
          <FeedbackModal />
          <p className="warning">This is a WIP. Some things are not polished. Scores you save now will probably be lost.</p>
        </footer>


      </div>
    );
  }
}

export default App;
