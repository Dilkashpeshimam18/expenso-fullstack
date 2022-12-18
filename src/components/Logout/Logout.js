import React from 'react'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../../store/slice/auth-slice'
import { useDispatch } from 'react-redux'
import './Logout.css'
const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(authActions.logout())
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        navigate('/login')
    }
    return (
        <div className='logout' onClick={handleLogout} >
            <button className='header__authBtn'>Logout</button></div>
    )
}

export default Logout