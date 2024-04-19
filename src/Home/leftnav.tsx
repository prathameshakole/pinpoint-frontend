
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as client from '../User/client';
import { useDispatch } from 'react-redux';
import { resetUser } from '../User/reducer';

const LeftNav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleSignout = async () => {
        await client.signout();
        dispatch(resetUser());
        navigate("/");
    };

    return (
        <div className="d-none d-lg-block col-lg-3 p-0">
            <div className="d-flex flex-column bg-dark text-white p-5 position-fixed" style={{ top: 0, left: 0, height: '100vh' }}>
                <Link to="/home" className="d-flex align-items-center mb-3 text-white text-decoration-none fs-4">
                    Pin Point
                </Link>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/home" className="btn btn-secondary w-100 mb-2" aria-current="page">
                            Home
                        </Link>
                    </li>
                    {localStorage.getItem("token") != null && (
                        <>
                            <li>
                                <button onClick={handleSignout} className="btn btn-secondary w-100 mb-2">
                                    Sign out
                                </button>
                            </li>
                            <li>
                                <Link to="/profile" className="btn btn-secondary w-100 mb-2">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button className="btn btn-secondary w-100 mb-2" onClick={openModal}>
                                    Post
                                </button>
                            </li>
                        </>
                    )}
                    {localStorage.getItem("token") == null && (
                        <li>
                            <Link to="/signin" className="btn btn-secondary w-100 text-white">
                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                Sign in
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>

    );
};
export default LeftNav;
