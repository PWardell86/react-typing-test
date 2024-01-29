import './App.css';
import MainSection from './components/MainSection';
import MainNavbar from './components/MainNavbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => { 
      setLoggedIn(true); 
      setUser(codeResponse) 
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  const logout = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
    setLoggedIn(false);
  };

  const getProfile = () => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => setProfile(res.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(getProfile, [user]);

  return (
    <div>
      <MainNavbar
        profileImage={profile ? profile.picture : ''}
        username={profile ? profile.name : ''}
        googleLogin={login}
        googleLogout={logout}
        isLoggedIn={loggedIn}
      />
      <MainSection />
    </div>
  );


}

export default App;
