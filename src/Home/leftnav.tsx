import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as client from '../User/client';
import { useDispatch } from 'react-redux';
import { resetUser } from '../User/reducer';

const LeftNav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignout = async () => {
        await client.signout();
        dispatch(resetUser());
        navigate("/");
    };

    return (
        <div className="d-none d-lg-block col-lg-3 p-0">
            <div className="d-flex flex-column p-5 position-fixed" style={{ top: 0, left: 0, height: '100vh' }}>
                <Link to="/home/trending" className="d-flex align-items-center mb-3 text-white text-decoration-none fs-4">
                    Pin Point
                </Link>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/home/trending" className="nav-link w-100 mb-2" aria-current="page">
                            <h5>Home</h5>
                        </Link>
                    </li>
                    {localStorage.getItem("token") != null ? (
                        <>
                            <Link to="/profile" className="nav-link w-100 mb-2"><h5>Profile</h5></Link>
                            <Link to="/ads" className="nav-link w-100 mb-2"><h5>My Ads</h5></Link>
                            <Link to="/admin" className="nav-link w-100 mb-2"> <h5>Admin Panel</h5></Link>
                            <Link onClick={handleSignout} className="nav-link w-100 mb-2" to={''}><h5>Sign out</h5></Link>
                        </>
                    ) : <Link to="/signin" className="nav-link w-100"><h5>Sign in</h5></Link>}
                </ul>
            </div>
        </div>

    );
};
export default LeftNav;
