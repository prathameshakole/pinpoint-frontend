import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { findUserById } from './client';
import LeftNav from '../Home/leftnav';
import UserList from './userList';
import { useSelector } from 'react-redux';
import { findUserPost } from '../Home/client';

const UserProfile = () => {
    const [userPosts, setUserPosts] = useState([]);
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
        const fetchUserPosts = async () => {
            const response = await findUserPost(profileId)
            setUserPosts(response)
        }
        fetchUserData();
        fetchUserPosts();
    }, [profileId]);
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4 d-none d-lg-block">
                    <LeftNav />
                </div>
                <div className="col-12 col-lg-8">
                    <nav className="nav nav-underline justify-content-center">
                        <div className="nav-link active m-4">
                            <h5>Profile</h5>
                        </div>
                    </nav>
                    <div className="card p-2 shadow-lg">
                        <div className="container">
                            <div className="row align-items-center p-4">
                                <div className="col-lg-4 d-flex align-items-center mb-3 mb-lg-0">
                                    <img
                                        className="me-2"
                                        src={user.image === undefined || user.image === '' ? "/default.jpg" : user.image}
                                        alt="profile-image"
                                        style={{ maxWidth: "80px", borderRadius: '50%' }}
                                    />
                                    <div>
                                        <div className="d-flex align-items-center">
                                            <h5>{'@' + user.username}</h5>
                                        </div>
                                        <h6>{user.firstName + " " + user.lastName}</h6>
                                        {user._id == loggedInUser._id && <h6>{user.email}</h6>}
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-5 col-lg-5 mb-3 mb-lg-0 nav">
                                            <UserList isOpen={followerIsOpen} onClose={closeFollower} userList={user.follower} />
                                            <Link
                                                className="nav-link"
                                                to={''}
                                                onClick={() => openFollower(user.follower.length !== 0)}
                                            >
                                                <h5>{'Followers ' + user.follower.length}</h5>
                                            </Link>
                                        </div>
                                        <div className="col-5 col-lg-5 mb-3 mb-lg-0 nav float-end">
                                            <UserList isOpen={followingIsOpen} onClose={closeFollowing} userList={user.following} />
                                            <Link
                                                className="nav-link"
                                                to={''}
                                                onClick={() => openFollowing(user.following.length !== 0)}
                                            >
                                                <h5>{`Following ${user.following.length}`}</h5>
                                            </Link>
                                        </div>
                                        <div className="col-2 text-center">
                                            {loggedInUser._id === user._id && (
                                                <button className="btn btn-primary" onClick={editProfile}>
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h6>About : {user.bio}</h6>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <nav className="nav nav-underline justify-content-center">
                            <div className="nav-link active mb-4">
                                <h5>Posts</h5>
                            </div>
                        </nav>
                    </div>
                    <div className='row row-cols-1 row-cols-md-3 g-3'>
                        {userPosts.map((post: any, index: any) => (
                            <div key={post._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                <div className="card h-100">
                                    <img
                                        className="card-img-top"
                                        key={post._id}
                                        src={post.image}
                                        alt="image"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
