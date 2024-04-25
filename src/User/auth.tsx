import { useEffect, useState } from 'react';
import * as client from "./client";
import { setUser } from "./reducer";
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Auth = () => {
    var user = useSelector((state: any) => state.userReducer.user);
    const [login, setLogin] = useState<boolean>(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginChange = (e: any) => {
        const { name, value } = e.target;
        dispatch(setUser({ ...user, [name]: value }));
    };

    useEffect(() => {
        if (user._id !== undefined && user._id !== '') {
            navigate("/")
        }
    }, [])

    const handleRegisterChange = (e: any) => {
        const { name, value } = e.target;
        if (name === "advertiser") {
            if (value === 'on') {
                dispatch(setUser({ ...user, role: "ADVERTISER" }));
            } else {
                dispatch(setUser({ ...user, role: "USER" }));
            }
        } else {
            dispatch(setUser({ ...user, [name]: value }));
        }
    };

    const handleLoginSubmit = async (e: any) => {
        try {
            await client.signin(user);
            const newUser = await client.profile();
            dispatch(setUser(newUser));
            navigate("/");
        } catch (err: any) {
            toast.error(err.response.data);
        }
    };

    const handleRegisterSubmit = async (e: any) => {
        try {
            await client.createUser(user);
            await client.signin(user);
            const newUser = await client.profile();
            dispatch(setUser(newUser));
            navigate("/");
        } catch (err: any) {
            toast.error(err.response.data);
        }
    };

    const handleToggle = () => {
        setLogin(!login);
    }

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <ToastContainer />
            <div className="text-center mb-4">
                <img src='logo.png' alt="login" className="rounded-circle" style={{ maxWidth: '200px' }} />
            </div>
            <div className="row w-100">
                <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    {login ? (
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <h3>Login</h3>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" value={user.username} onChange={handleLoginChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleLoginChange} />
                                </div>
                                <div className="d-grid mb-3">
                                    <button className="btn btn-primary" onClick={handleLoginSubmit}>Login</button>
                                </div>
                                <div className="text-center mb-3">
                                    <h5>New User?</h5>
                                </div>
                                <div className="d-grid mb-3">
                                    <button className="btn btn-outline-success" onClick={handleToggle}>Register</button>
                                </div>
                                <div className="d-grid">
                                    <Link className='btn btn-warning' to='/'>Continue As a Guest</Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <h3>Register</h3>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="registerUsername" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="registerUsername" name="username" value={user.username} onChange={handleRegisterChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="registerPassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="registerPassword" name="password" value={user.password} onChange={handleRegisterChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="registerEmail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="registerEmail" name="email" value={user.email} onChange={handleRegisterChange} />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="advertiser" name="advertiser" onChange={handleRegisterChange} />
                                    <label className="form-check-label" htmlFor="advertiser">Register as Advertiser</label>
                                </div>
                                <div className="d-grid mb-3">
                                    <button className="btn btn-primary" onClick={handleRegisterSubmit} type="submit">Register</button>
                                </div>
                                <div className="text-center mb-3">
                                    <h5>Already Registered?</h5>
                                </div>
                                <div className="d-grid mb-3">
                                    <button className='btn btn-outline-primary' onClick={handleToggle}>Login</button>
                                </div>
                                <div className="d-grid">
                                    <Link className='btn btn-warning' to='/'>Continue As a Guest</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;