import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './UpdateProfile.css'
const UpdateProfile = ({ setIsUpdated }) => {
    const userToken = useSelector(state => state.auth.userToken)


    const [name, setName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const navigate = useNavigate()

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
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            if (userToken) {
                const data = {
                    idToken: userToken,
                    displayName: name,
                    photoUrl: photoUrl,
                    returnSecureToken: true
                }

                const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDKj1Lc9A0JYGLuOTbYEr8SD-7ChLkI1Ys', data, {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }

                ).then(() => {
                    setName('')
                    setPhotoUrl('')
                    alert('Profile updated!')
                    setIsUpdated(false)
                    getUserProfileData()
                })


            }

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserProfileData()
    }, [])
    return (
        <div className='updateProfile'>
            <h2 className='auth__title'>Update Profile</h2>
            <div className='updateProfile__container'>
                <form onSubmit={handleUpdateProfile}>
                    <div className='formInput__container'>
                        <TextField className='form-input' id="outlined-basic" label="Full name" type='text' variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />

                    </div>
                    <div className='formInput__container'>
                        <TextField className='form-input' id="outlined-basic" label="Profile Photo Url" type='text' variant="outlined" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required />

                    </div>
                    <div className='updateButton__container'>
                        <button type='submit' className='update-button'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile