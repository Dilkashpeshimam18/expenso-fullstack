import React, { useState } from 'react'
import axios from 'axios'

const VerifyEmail = () => {
    const [userToken, setUserToken] = useState(() => {
        return localStorage.getItem('token') || null
    })
    const handleEmailVerify = async (e) => {
        e.preventDefault()
        try {
            const data = {
                requestType: 'VERIFY_EMAIL',
                idToken: userToken
            }

            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDKj1Lc9A0JYGLuOTbYEr8SD-7ChLkI1Ys', data, {
                headers: {
                    'Content-Type': 'application/json',

                }
            })
            if (response.status == 200) {
                alert('Check your email for verification link')
            }


        } catch (err) {
            console.log(err)
            alert(err)
        }
    }
    return (
        <div>

            <button onClick={handleEmailVerify}>Verify Email</button>
        </div>
    )
}

export default VerifyEmail