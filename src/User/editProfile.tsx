import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { updateUser } from './client';

const EditProfile = () => {
    const user = useSelector((state: any) => state.userReducer.user);
    const [formData, setFormData] = useState({
        _id: user._id,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        bio: user.bio
    });
    const navigate = useNavigate();
    const navigateBack = () => {
        navigate(`/profile/${user._id}`);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const arrayBuffer = reader.result;
                const img = new Image();
                img.src = arrayBuffer;
                img.onload = () => {
                  const canvas = document.createElement('canvas');
                  const MAX_WIDTH = 500;
                  const MAX_HEIGHT = 500;
          
                  let width = img.width;
                  let height = img.height;
          
                  if (width > height) {
                    if (width > MAX_WIDTH) {
                      height *= MAX_WIDTH / width;
                      width = MAX_WIDTH;
                    }
                  } else {
                    if (height > MAX_HEIGHT) {
                      width *= MAX_HEIGHT / height;
                      height = MAX_HEIGHT;
                    }
                  }
          
                  canvas.width = width;
                  canvas.height = height;
          
                  const ctx = canvas.getContext('2d');
                  ctx?.drawImage(img, 0, 0, width, height);
          
                  const resizedArrayBuffer = canvas.toDataURL();
                  setFormData({...formData, image: resizedArrayBuffer});
                }
            };
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        updateUser(formData);
    };

    return (
        <div className="container mt-5">
            <button className='btn btn-primary mb-3' onClick={navigateBack}> Back</button>
            <div className="card">
                <h1 className="card-header text-center">Edit Profile</h1>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Avatar</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;