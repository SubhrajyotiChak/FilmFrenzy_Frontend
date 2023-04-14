import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { postLogin } from './PostMessage'
import queryString from 'query-string'
import toast from 'react-hot-toast';
import { logout } from "./UserReducer";
import { Link } from 'react-router-dom';
import '../Styling/UserManagement.css'

const Login = () => {
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
        dispatch(postLogin(data));
    }

    return (

        <div className="outer">
            <div className="inner">
                <form onSubmit={handleSubmit(submitForm)} className="form_login">
                    <h3>Sign In</h3>
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
                    <div className="d-grid">
                        <div></div>
                        <button type="submit" className="btn btn-success" disabled={pending}>
                            Submit
                        </button>
                    </div>
                    <div className="d-grid text-center mt-3">
                        <Link to={"/registration?redirectTo=" + redirectTo} className="h8 link-login "><div className="h8 link-login">Don't have an account? Register</div></Link>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
