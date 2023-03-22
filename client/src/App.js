import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import { useSelector, useDispatch } from 'react-redux';
import { postExpenseData } from './store/slice/expense-slice';
import Header from './components/Header/Header';
let isInitial = true
function App() {
  const [open, setOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false)
  const theme = useSelector(state => state.theme.theme)
  const userToken = useSelector(state => state.auth.userToken)

  useEffect(() => {
    if (isInitial) {
      isInitial = false
    }
    if (localStorage.getItem('token') != null && localStorage.getItem('email') != null) {
      localStorage.removeItem('token');

    }
  }, [])
  useEffect(() => {
    localStorage.setItem('token', userToken)
  }, [])

  return (
    <div className="app" id={theme}>
      <Header open={open} setOpen={setOpen} isUpdated={isUpdated} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/update-profile' element={<UpdateProfile isUpdated={isUpdated} setIsUpdated={setIsUpdated} />} />
      </Routes>
    </div>
  );
}

export default App;
