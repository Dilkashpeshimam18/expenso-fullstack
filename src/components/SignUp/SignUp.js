import React, { useState } from 'react'
import './SignUp.css'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const isPasswordConfirmed = (password, confimPassword) => {
        if (password && confimPassword && password === confimPassword) return true;
        return false;
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            if (!isPasswordConfirmed(password, confirmPassword)) {
                alert('Password & confirm password should be same!')
            } else {
                if (email != '' && password != '' && confirmPassword != '') {
                    const data = {
                        email: email,
                        password: password,
                        returnSecureToken: true

                    }
                    const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKj1Lc9A0JYGLuOTbYEr8SD-7ChLkI1Ys', data, {
                        headers: {
                            'Content-Type': 'application/json',

                        }
                    }).then(() => {
                        console.log(' User has successfully signed up')
                        alert('Sign up successful!')
                        setEmail('')
                        setPassword('')
                        setConfirmPassword('')
                        navigate('/login')
                    })
                    console.log(response)
                }

            }



        } catch (err) {
            console.log(err)
            alert(err)
        }
    }
    return (
        <div className='signUp'>
            <div className='signUp__container'>
                <h3>SignUp</h3>
                <div className='form__container'>
                    <form onSubmit={handleSignUp} className='signUp__form'>
                        <div className='formInput__container'>
                            <TextField className='form-input' id="outlined-basic" label="Email" type='email' variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        </div>
                        <div className='formInput__container'>
                            <TextField className='form-input' id="outlined-basic" label="Password" type='password' variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        </div>
                        <div className='formInput__container'>
                            <TextField className='form-input' id="outlined-basic" label="Confirm Password" type='password' variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                        </div>
                        <div className='signUpButton__container'>
                            <button type='submit' className='signUp-button'>SIGN UP</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp