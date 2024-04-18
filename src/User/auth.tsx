import React, { useState } from 'react';
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

    const handleRegisterChange = (e: any) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
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

    const handleRegisterSubmit = (e: any) => {
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6'>
                <img
                    src='boston.webp'
                    style={{
                        width: '20vw',
                        objectFit: 'cover',
                    }}
                    alt="Boston"
                />
                </div>
                <div className='col-lg-6 card shadow-lg'>
                    <div>
                        <h2>Login</h2>
                            <div>
                                <label>Username:</label>
                                <input type="text" className='form-control m-2' name="username" value={user.username} onChange={handleLoginChange} />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input type="password" className='form-control m-2' name="password" value={user.password} onChange={handleLoginChange} />
                            </div>
                            <button className='btn btn-primary m-2' onClick={handleLoginSubmit}>Login</button>
                    </div>
                    <div>
                        <h2>Register</h2>
                            <div>
                                <label>Username:</label>
                                <input type="text" className='form-control m-2' name="username" value={user.username} onChange={handleRegisterChange} />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input type="password" className='form-control m-2' name="password" value={user.password} onChange={handleRegisterChange} />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input type="email" className='form-control m-2' name="email" value={user.email} onChange={handleRegisterChange} />
                            </div>
                            <button className='btn btn-success m-2' onClick={handleRegisterSubmit} type="submit">Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
