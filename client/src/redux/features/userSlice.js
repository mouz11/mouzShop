import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    isFetching: false,
    error: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload.user;
            state.currentUser.token = action.payload.token;
            state.error = false
        },
        loginFailure: (state) => {
            state.isFetching = false
            state.error = true

        },
        signupStart: (state) => {
            state.isFetching = true
        },
        signupSuccess: (state, action) => {
            state.isFetching = false
            state.error = false
        },
        signupFailure: (state) => {
            state.isFetching = false
            state.error = true

        },
        logoutStart: (state) => {
            state.isFetching = true
        },
        logoutSuccess: (state) => {
            state.isFetching = false
            state.currentUser = null;
            state.error = false
        },
        logoutFailure: (state) => {
            state.isFetching = false
            state.error = true

        },
    },
})

export const { loginFailure, loginStart, loginSuccess, logoutSuccess, logoutFailure, logoutStart, signupStart, signupFailure, signupSuccess } = userSlice.actions

export default userSlice.reducer
