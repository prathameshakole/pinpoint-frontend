import { Link, useNavigate } from 'react-router-dom';
import * as client from '../User/client';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../User/reducer';
import CircularSearchBox from '../Search/searchBar';
import { useState } from 'react';

const LeftNavSm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userReducer.user);
    const [isOpen, setIsOpen] = useState(false);

    const handleSignout = async () => {
        await client.signout();
        dispatch(resetUser());
        navigate('/');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white d-lg-none fixed-top">
                <div className="container-fluid">
                    <Link to="/home/trending" className="navbar-brand d-flex justify-content-center align-items-center">
                        <img
                            src='logo.png'
                            alt="logo"
                            className="rounded-circle me-2"
                            height="30"
                            width="30"
                        />
                        <Link to="/home/trending" className="d-flex align-items-center text-decoration-none fs-4">
                            Pin Point
                        </Link>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleMenu}
                        aria-controls="navbarNav"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
                        id="navbarNav"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/home/trending" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            {localStorage.getItem('token') !== null ? (
                                <>
                                    <li className="nav-item">
                                        <Link to={`/profile/${user._id}`} className="nav-link">
                                            Profile
                                        </Link>
                                    </li>
                                    {user.role === 'ADVERTISER' && (
                                        <li className="nav-item">
                                            <Link to="/ads" className="nav-link">
                                                My Ads
                                            </Link>
                                        </li>
                                    )}
                                    {user.role === 'ADMIN' && (
                                        <li className="nav-item">
                                            <Link to="/admin/ads" className="nav-link">
                                                Admin Panel
                                            </Link>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <Link
                                            to=""
                                            onClick={handleSignout}
                                            className="nav-link"
                                        >
                                            Sign out
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <Link to="/signin" className="nav-link">
                                        Sign in
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <CircularSearchBox />
                    </div>
                </div>
            </nav>
            <div className="pt-5 d-lg-none"></div>
        </>
    );
};

export default LeftNavSm;