import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { findUserById } from './client';
import LeftNav from '../Home/leftnav';

const UserProfile = () => {
    const user = useSelector((state: any) => state.userReducer.user);
    const navigate = useNavigate();
    const editProfile = () => {
        navigate('/profile/edit');
    };
    const { profileId } = useParams();
    const [user2, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (profileId) {
                    const response = await findUserById(profileId);
                    setUser(response.data);
                } else {
                    setUser(user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [profileId, user]);

    if (!user2) {
        return <div>Loading...</div>;
    }

    const isLoggedInUser = !profileId || user.id === user.id;


    return (
        <div className="container mt-4">
            <div className="row">
                <div>
                    <LeftNav/>
                </div>
                <div className="col-md-4">
                    <div className="text-center mb-3">
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="rounded-circle"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h1 className="card-title mb-0">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <button className="btn btn-primary" onClick={editProfile}>Edit profile</button>
                            </div>
                            <p className="card-text">@{user.username}</p>
                            <p className="card-text">{user.bio}</p>
                            <p className="card-text">
                                <i className="fas fa-map-marker-alt"></i> {user.location}
                            </p>
                            <p className="card-text">
                                <i className="fas fa-calendar-alt"></i> Joined{' '}
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                            <p className="card-text">
                                <span className="font-weight-bold"></span>{' '}
                                Following{' '}
                                <span className="font-weight-bold"></span>{' '}
                                Followers
                            </p>
                            <div className="nav nav-tabs">
                                {isLoggedInUser && (
                                    <a href="#posts" className="nav-item nav-link active">
                                        Posts
                                    </a>
                                )}
                                <a href="#ranking" className="nav-item nav-link">
                                    Ranking
                                </a>
                                <a href="#following" className="nav-item nav-link">
                                    Following
                                </a>
                                <a href="#followers" className="nav-item nav-link">
                                    Followers
                                </a>
                                <a href="#likes" className="nav-item nav-link">
                                    Likes
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
