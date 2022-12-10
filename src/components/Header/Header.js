import React, { useEffect, useState } from 'react'
import './Header.css'
import Logout from '../Logout/Logout'
import ProfileModal from '../ProfileModal/ProfileModal'
import VerifyEmail from '../VerifyEmail/VerifyEmail'
import { useSelector, useDispatch } from 'react-redux'
import { themeActions } from '../../store/slice/theme-slice'
import ReactSwitch from 'react-switch'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import axios from 'axios'
const Header = ({ open, setOpen, isUpdated }) => {
    const userToken = useSelector(state => state.auth.userToken)
    const dispatch = useDispatch()
    const handleToggle = () => {
        dispatch(themeActions.toggleTheme())
        console.log(theme)
    }
    const theme = useSelector(state => state.theme.theme)
    const [name, setName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')

    const getUserProfileData = async () => {
        try {
            if (userToken) {
                let data = {
                    idToken: userToken
                }
                const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDKj1Lc9A0JYGLuOTbYEr8SD-7ChLkI1Ys', data, {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                })
                console.log(response)
                setName(response.data.users[0].displayName)
                setPhotoUrl(response.data.users[0].photoUrl)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserProfileData()

    }, [])
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

                    {userToken && <>
                        {open == true && <ProfileModal open={open} setOpen={setOpen} />}
                        <div className='header__rightSubLink'>
                            <VerifyEmail />


                        </div>
                        <div className='header__rightSubLink'>
                            <Logout />

                        </div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to='/update-profile'>
                            <div className='header__rightSubLink'>
                                <Avatar src={photoUrl} />

                                {name != '' ? <p style={{ marginLeft: '15px' }}>Hi, {name}</p> : <p style={{ marginLeft: '15px' }}>Hi, Guest</p>}

                            </div>
                        </Link>

                    </>


                    }
                </div>
            </div>

        </div>
    )
}

export default Header