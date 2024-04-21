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
    const [followerIsOpen, setFollowerIsOpen] = useState(false);
    const [followingIsOpen, setFollowingIsOpen] = useState(false);
    const openFollower = (open: boolean) => {
        if (open) {
            setFollowerIsOpen(true)
        }
    };
    const closeFollower = () => setFollowerIsOpen(false);
    const openFollowing = (open: boolean) => {
        if (open) {
            setFollowingIsOpen(true)
        }
    };
    const closeFollowing = () => setFollowingIsOpen(false);
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
        <div className="container">
            <div className="row">
                <div className="col-lg-3 d-none d-lg-block">
                    <LeftNav />
                </div>
                <div className="col-12 col-lg-9">
                    <nav className="nav nav-underline justify-content-center">
                        <p className="nav-link active">
                            <h5>Profile</h5>
                        </p>
                    </nav>
                    <div className="card p-2">
                        <div className="container">
                            <div className="row align-items-center p-4">
                                <div className="col-lg-3 text-center mb-3 mb-lg-0">
                                    <img
                                        className="me-2"
                                        src={user.image === undefined || user.image === '' ? "/default.jpg" : user.image}
                                        alt="profile-image"
                                        style={{ maxWidth: "80px", borderRadius: '50%' }}
                                    />
                                    <h5>{'@' + user.username}</h5>
                                    <h5>{user.firstName + " " + user.lastName}</h5>
                                    {user._id == loggedInUser._id && <h5>{user.email}</h5>}
                                </div>
                                <div className="col-lg-9">
                                    <div className="row">
                                        <div className="col-6 col-lg-5 mb-3 mb-lg-0 nav">
                                            <UserList isOpen={followerIsOpen} onClose={closeFollower} userList={user.follower} />
                                            <Link
                                                className="nav-link"
                                                to={''}
                                                onClick={() => openFollower(user.follower.length !== 0)}
                                            >
                                                <h5>{'Followers ' + user.follower.length}</h5>
                                            </Link>
                                        </div>
                                        <div className="col-6 col-lg-5 mb-3 mb-lg-0 nav float-end">
                                            <UserList isOpen={followingIsOpen} onClose={closeFollowing} userList={user.following} />
                                            <Link
                                                className="nav-link"
                                                to={''}
                                                onClick={() => openFollowing(user.following.length !== 0)}
                                            >
                                                <h5>{`Following ${user.following.length}`}</h5>
                                            </Link>
                                        </div>
                                        <div className="col-lg-2 text-center">
                                            {loggedInUser._id === user._id && (
                                                <button className="btn btn-primary" onClick={editProfile}>
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h6>{user.bio}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
