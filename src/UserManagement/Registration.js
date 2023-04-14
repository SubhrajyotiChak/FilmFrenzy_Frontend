import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { postRegistration } from './PostMessage'
import queryString from 'query-string'
import toast from 'react-hot-toast';
import { logout } from "./UserReducer";
import '../Styling/UserManagement.css'

const RegisterScreen = () => {
    const { userInfo,
        pending,
        fulfilled,
        rejected,
        errorMessage } = useSelector(
            (state) => state.user
        )
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const location = useLocation();
    const { redirectTo } = queryString.parse(location.search);

    useEffect(() => {
        if (fulfilled) {
            navigate(redirectTo == null ? "/" : redirectTo);
        }
        if (rejected) {
            toast.error(errorMessage)
            dispatch(logout())
        }
    }, [navigate, userInfo, fulfilled])

    const submitForm = (data) => {
        data.email = data.email.toLowerCase()
        const response = postRegistration(data);
        dispatch(response);
    }

    return (
        <div className="outer">
            <div className="inner">
                <form onSubmit={handleSubmit(submitForm)} className="form_login">
                    <h3>Sign Up</h3>
                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                            {...register('username')}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            {...register('email')}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            {...register('password')}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password again"
                            {...register('confirmedPassword')}
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <div></div>
                        <button type="submit" className="btn btn-success" disabled={pending}>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen
