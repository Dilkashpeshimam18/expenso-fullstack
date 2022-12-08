import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    userToken: localStorage.getItem('token') || null,
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
        }

    }
})

export const authActions = AuthSlice.actions
export default AuthSlice.reducer