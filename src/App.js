import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainSection from './components/MainSection';
import MainNavbar from './components/MainNavbar';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import axios from 'axios';
import Cookies from 'js-cookie';

function App({ backend }) {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      axios.post(backend + '/getuser', {
        token: token
      })
        .then((response) => {
          console.log(response);
          setUser(response.data.user[3]);
        }).catch((error) => {
          console.log(error);
        });
    }
  }, [user, backend]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage user={user} backend={backend} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={
          <div>
            <MainNavbar user={user} />
            <MainSection />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
