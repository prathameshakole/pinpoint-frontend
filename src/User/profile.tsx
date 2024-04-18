import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const user = useSelector((state: any) => state.userReducer.user);
    return (
        <div className="user-profile card">
            <img className="card-img-top" src={user.avatar} alt="User Avatar" />
            <div className="card-body">
                <h5 className="card-title">{user.firstName + " " + user.lastName}</h5>
                <p className="card-text">Email: {user.email}</p>
                <p className="card-text">Location: {user.location}</p>
                <p className="card-text">Bio: {user.bio}</p>
            </div>
        </div>
    );
};

export default UserProfile;
