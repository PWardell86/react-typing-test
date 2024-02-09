import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainSection from './components/MainSection';
import MainNavbar from './components/MainNavbar';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/" element={
          <div>
            <MainNavbar />
            <MainSection />
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
