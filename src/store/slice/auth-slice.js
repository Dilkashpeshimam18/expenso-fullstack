import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialAuthState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    userToken: localStorage.getItem('token') || null,
    name: '',
    photoUrl: '',
    emailVerified: null
}


const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.userToken = action.payload
            state.isAuthenticated = true
        },
        logout(state, action) {
            state.userToken = null
            state.isAuthenticated = false
        },
        isEmailVerify(state, action) {
            state.emailVerified = action.payload
        }

    }
})



export const authActions = AuthSlice.actions
export default AuthSlice.reducer