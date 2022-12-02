import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
