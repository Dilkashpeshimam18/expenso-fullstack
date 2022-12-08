import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import { useSelector, useDispatch } from 'react-redux';
import { postExpenseData } from './store/slice/expense-slice';

function App() {
  const [open, setOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false)
  const theme = useSelector(state => state.theme.theme)
  const expenses = useSelector(state => state.expenses.expenses)
  const dispatch = useDispatch()

  return (
    <div className="app" id={theme}>
      <Routes>
        <Route path='/' element={<Home open={open} setOpen={setOpen} isUpdated={isUpdated} />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/update-profile' element={<UpdateProfile isUpdated={isUpdated} setIsUpdated={setIsUpdated} />} />
      </Routes>
    </div>
  );
}

export default App;
