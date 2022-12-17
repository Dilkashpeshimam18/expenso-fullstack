import React, { useEffect, useState } from 'react'
import './Header.css'
import Logout from '../Logout/Logout'
import ProfileModal from '../ProfileModal/ProfileModal'
import VerifyEmail from '../VerifyEmail/VerifyEmail'
import { useSelector, useDispatch } from 'react-redux'
import { themeActions } from '../../store/slice/theme-slice'
import ReactSwitch from 'react-switch'
import { Link } from 'react-router-dom'
const Header = ({ open, setOpen, isUpdated }) => {
    const userToken = useSelector(state => state.auth.userToken)
    const dispatch = useDispatch()
    const handleToggle = () => {
        dispatch(themeActions.toggleTheme())
        console.log(theme)
    }
    const theme = useSelector(state => state.theme.theme)

    return (
        <div className='header'>
            <div className='header__container'>
                <div className='header__left'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/'><h2>Expenso</h2></Link>
                </div>
                <div className='header__right'>
                    <div className='header__rightSub'>
                        <ReactSwitch onChange={handleToggle} checked={theme == 'dark'} />

                    </div>
                    {!userToken && <div className='header__rightSubLink'>
                        <Link to='/login'><h3>Login</h3></Link>

                    </div>}

                    {userToken && <>
                        {open == true && <ProfileModal open={open} setOpen={setOpen} />}
                        <div className='header__rightSubLink'>
                            <VerifyEmail />


                        </div>
                        <div className='header__rightSubLink'>
                            <Logout />

                        </div>

                    </>


                    }
                </div>
            </div>

        </div>
    )
}

export default Header