import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const data = {
                email: email,
                password: password,
                returnSecureToken: true
            }
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKj1Lc9A0JYGLuOTbYEr8SD-7ChLkI1Ys', data, {
                headers: {
                    'Content-Type': 'application/json',

                }
            })
            if (response.data.idToken) {
                let token = response.data.idToken
                let email = response.data.email
                localStorage.setItem('token', token)
                localStorage.setItem('email', email)
                alert('Login Successful!')
                navigate('/')

            }



        } catch (err) {
            console.log(err.message)
            alert(err.message)
        }
    }
    return (
        <div>
            <div className='signUp__container'>
                <h3>Login</h3>
                <div className='form__container'>
                    <form onSubmit={handleLogin} className='signUp__form'>
                        <div className='formInput__container'>
                            <TextField className='form-input' id="outlined-basic" label="Email" type='email' variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        </div>
                        <div className='formInput__container'>
                            <TextField className='form-input' id="outlined-basic" label="Password" type='password' variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        </div>

                        <div className='signUpButton__container'>
                            <button type='submit' className='signUp-button'>Login</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login