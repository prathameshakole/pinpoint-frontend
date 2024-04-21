import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { findUserById } from './client';
import LeftNav from '../Home/leftnav';
import UserList from './userList';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const loggedInUser = useSelector((state: any) => state.userReducer.user);
    const navigate = useNavigate();
    const { profileId }: any = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [adModalIsOpen, setAdModalIsOpen] = useState(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const openAdModal = () => setAdModalIsOpen(true);
    const closeAdModal = () => setAdModalIsOpen(false);
    const [user, setUser] = useState({
        username: "", password: "", bio: "", firstName: "", lastName: "", role: "USER", _id: "", email: "", image: "", following: [], follower: []
    });
    const editProfile = () => {
        navigate('/editprofile');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (profileId != undefined) {
                    const response = await findUserById(profileId);
                    setUser(response);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [profileId]);
    return (
        <div className='container'>
            <div className="row">
                <div className='col-lg-3 d-block-lg'>
                    <LeftNav />
                </div>
                <div className='col-lg-6 col-md-8 col-10'>
                    <nav className="nav nav-underline justify-content-center">
                        <p className='nav-link active'><h5>Profile</h5></p>
                    </nav>
                    <div className='card p-2'>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className='d-flex align-items-center'>
                                <img src={user.image == undefined || user.image == '' ? "/default.jpg" : user.image} alt='profile-image' style={{ maxWidth: "100px" }} />
                                <h5>{'@' + user.username}</h5>
                            </div>
                            <div className='nav'>
                                <UserList isOpen={modalIsOpen} onClose={closeModal} userList={user.following} />
                                <Link className='nav-link' to={''} onClick={openModal}><h5>Followers {user.follower.length}</h5></Link>
                            </div>
                            <div className='nav'>
                                <UserList isOpen={modalIsOpen} onClose={closeModal} userList={user.follower} />
                                <Link className='nav-link' to={''} onClick={openModal}><h5>Following {user.following.length}</h5></Link>
                            </div>
                            <div>
                                {loggedInUser._id == user._id && <button className='btn btn-primary me-2' onClick={editProfile}>
                                    Edit
                                </button>}
                            </div>
                        </div>
                        <div className='ps-4'>
                            <h5>{user.firstName + " " + user.lastName}</h5>
                            <h6>{user.bio}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
