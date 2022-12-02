import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';

const UpdateProfile = ({ setIsUpdated }) => {
    const [userToken, setUserToken] = useState(() => {
        return localStorage.getItem('token') || null
    })
    const [name, setName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')

    useEffect(() => {
    }, [])
    const handleUpdate = async (e) => {
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
                })


            }

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h2>Update Profile</h2>
            <div>
                <form onSubmit={handleUpdate}>
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