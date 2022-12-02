import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
