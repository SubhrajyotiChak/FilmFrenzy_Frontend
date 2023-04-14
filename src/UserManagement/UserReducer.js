// Reference: https://github.com/ganeshmani/redux-toolkit-user-flow 

import { createSlice } from '@reduxjs/toolkit'
import { postRegistration, postLogin, getLoginInfo } from './PostMessage'
import '../Styling/UserManagement.css'

const initialState = {
    userInfo: null,
    pending: false,
    fulfilled: false,
    rejected: false,
    errorMessage: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            state.pending = false;
            state.fulfilled = false;
            state.rejected = false;
            state.userInfo = null
        },
    },
    reducers: {
    },
    extraReducers: {
        [postLogin.pending]: (state) => {
            state.pending = true;
            state.fulfilled = false;
            state.rejected = false;
        },
        [postRegistration.pending]: (state) => {
            state.pending = true;
            state.fulfilled = false;
            state.rejected = false;
        },
        [postLogin.fulfilled]: (state, action) => {
            state.pending = false;
            state.fulfilled = true;
            state.rejected = false;
            state.userInfo = action.payload;
        },
        [postRegistration.fulfilled]: (state, action) => {
            state.pending = false;
            state.fulfilled = true;
            state.rejected = false;
            state.userInfo = action.payload;
        },
        [getLoginInfo.fulfilled]: (state, action) => {
            state.pending = false;
            state.fulfilled = true;
            state.rejected = false;
            state.userInfo = action.payload;
        },
        [postLogin.rejected]: (state) => {
            state.pending = false;
            state.fulfilled = false;
            state.rejected = true;
        },
        [postRegistration.rejected]: (state) => {
            state.pending = false;
            state.fulfilled = false;
            state.rejected = true;
        }
    },
})

export const { logout } = userSlice.actions

export const customizedSelector = (state) => state.user;

export default userSlice.reducer
