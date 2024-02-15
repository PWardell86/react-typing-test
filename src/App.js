import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainSection from './components/MainSection';
import MainNavbar from './components/MainNavbar';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UserStats from './components/UserStats';
import axios from 'axios';

class App extends React.Component {
  state = { user: null };
  token = localStorage.getItem('token');

  componentDidMount() {
    if (this.token) {
      axios.post(this.props.backend + '/getuser', {
        token: this.token
      })
        .then((response) => {
          this.setState({user: response.data.user[3]});
        }).catch((error) => {
          console.log(error);
        });
    }
  }
  render = () => {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage user={this.state.user} backend={this.props.backend} />} />
        <Route path="/signup" element={<SignupPage backend={this.props.backend} />} />
        <Route path="/" element={
          <div>
            <div id="game-section">
              <MainNavbar user={this.state.user} />
              <MainSection backend={this.props.backend} />
            </div>
            <div className="section-sep"/>
            <UserStats backend={this.props.backend} token={this.token} />
          </div>
        } />
      </Routes>
    </BrowserRouter >
    );
  }
}

export default App;
