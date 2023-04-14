import { createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from "react-redux"
import '../Styling/UserManagement.css'

export const postLogin = createAsyncThunk(
    '/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await fetch(
                '/app/user/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );
            let data = await response.json();
            if (response.status === 200) {
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('userId', data.id);
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const postRegistration = createAsyncThunk(
    '/register',
    async (data, thunkAPI) => {
        try {
            const response = await fetch('/app/user/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            let responseData = await response.json();
            if (response.status === 200) {
                localStorage.setItem('token', responseData.accessToken);
                localStorage.setItem('userId', responseData.id);
                return responseData;
            } else {
                return thunkAPI.rejectWithValue(responseData);
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getLoginInfo = createAsyncThunk(
    '/info',
    async ({ token }, thunkAPI) => {
        try {
            const response = await fetch('/app/user/info', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                }
            })
            let responseData = await response.json();
            if (response.status === 200) {
                localStorage.setItem('userId', responseData.id);
                return responseData;
            } else {
                return thunkAPI.rejectWithValue(responseData);
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);