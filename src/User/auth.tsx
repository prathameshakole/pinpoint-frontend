import { useEffect, useState } from 'react';
import * as client from "./client";
import { setUser } from "./reducer";
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../logo.png'

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
        <div className="container">
            <ToastContainer/>
            <div className=" m-4">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 p-2 m-5">
                            <div className="text-center">
                                <img src={logo} alt="login" className="rounded-circle"/>
                            </div>
                    </div>
                    <div className="col-lg-4">
                        {
                            login ? (
                            <div className="card mt-1">
                            <div className="card-body">
                                <div className="text-center">
                                    <h3>Login</h3>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" value={user.username} onChange={handleLoginChange} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleLoginChange} />
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-primary mt-3" onClick={handleLoginSubmit}>Login</button>
                                </div>
                                <h5 className='mt-2'>New User ?</h5>
                                <div className="d-grid">
                                    <button className="btn btn-outline-success" onClick={handleToggle}>Register</button>
                                </div>
                            </div>
                        </div>) : (
                            <div className="card mt-2">
                            <div className="card-body">
                                <div className="text-center">
                                    <h3>Register</h3>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="registerUsername" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="registerUsername" name="username" value={user.username} onChange={handleRegisterChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="registerPassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="registerPassword" name="password" value={user.password} onChange={handleRegisterChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="registerEmail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="registerEmail" name="email" value={user.email} onChange={handleRegisterChange} />
                                </div>
                                <div className="mb-2 form-check">
                                    <input type="checkbox" className="form-check-input" id="advertiser" name="advertiser" onChange={handleRegisterChange} />
                                    <label className="form-check-label" htmlFor="advertiser">Register as Advertiser</label>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-primary" onClick={handleRegisterSubmit} type="submit">Register</button>
                                </div>
                                <div className="d-grid">
                                    <h5 className='mt-2'>Already Registered ?</h5><button className='btn btn-outline-primary' onClick={handleToggle}>Login</button>
                                </div>
                            </div>
                        </div>
                        )
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Auth;
