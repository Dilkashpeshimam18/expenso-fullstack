import React, { useState, useEffect } from 'react'
import './HomeLeft.css'
import HomeOption from './HomeOption/HomeOption'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../store/slice/auth-slice';
import axios from 'axios';
const HomeLeft = () => {
    const [name, setName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const userToken = useSelector(state => state.auth.userToken)
    const dispatch = useDispatch()
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
                setName(response.data.users[0].displayName)
                setPhotoUrl(response.data.users[0].photoUrl)
                dispatch(authActions.isEmailVerify(response.data.users[0].emailVerified))
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserProfileData()

    }, [])
    return (
        <div className='homeLeft'>
            <div className='homeLeft__userProfile'>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/update-profile'>
                    <div >
                        <Avatar sx={{ width: 100, height: 105, marginLeft: '25px' }}
                            src={photoUrl} />
                        <div className='userProfile__name'>
                            {name != '' ? <h3 > {name}</h3> : <h3 style={{ marginLeft: '35px' }}>Hi, Guest</h3>}

                        </div>

                    </div>
                </Link>
            </div>
            <HomeOption /></div>
    )
}

export default HomeLeft