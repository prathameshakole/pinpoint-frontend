import React, { useEffect } from 'react';
import * as client from "./client";
import { setUser } from "./reducer";
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

const Auth = () => {
    var user = useSelector((state: any) => state.userReducer.user);
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
        }
    };

    return (
        <div className='container' style={{ position: 'relative' }}>
            <div>
                <div className='col-lg-6 col-md-8 col-10 card p-4' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 20%)' }}>
                    <div>
                        <h2>Login</h2>
                        <div>
                            <label>Username</label>
                            <input type="text" className='form-control mb-2' name="username" value={user.username} onChange={handleLoginChange} />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" className='form-control' name="password" value={user.password} onChange={handleLoginChange} />
                        </div>
                        <button className='btn btn-primary mt-4 mb-4' onClick={handleLoginSubmit}>Login</button>
                    </div>
                    <div>
                        <h2>Register</h2>
                        <div>
                            <label>Username</label>
                            <input type="text" className='form-control mb-2' name="username" value={user.username} onChange={handleRegisterChange} />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" className='form-control mb-2' name="password" value={user.password} onChange={handleRegisterChange} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" className='form-control mb-2' name="email" value={user.email} onChange={handleRegisterChange} />
                        </div>
                        <div>
                            <label>Register as Advertiser</label>
                            <input type="checkbox" className='form-check mb-2' name="advertiser" onChange={handleRegisterChange} />
                        </div>
                        <button className='btn btn-success mt-4' onClick={handleRegisterSubmit} type="submit">Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
