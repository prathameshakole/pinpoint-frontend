import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import * as client from '../Home/client'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addPost } from '../Home/reducer';
import { User } from '../User/reducer';
import { Post } from '../Home/reducer';

const CreatePost = ({ isOpen, onClose }: { isOpen: boolean, onClose: any }) => {
    const [image, setImage] = useState("");
    const userObj: User = useSelector((state: any) => state.userReducer.user);
    const [searchValue, setSearchValue] = useState({
        1: '', 2: '', 3: '', 4: '', 5: ''
    });
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userLocation, setUserLocation] = useState({ longitude: 0, latitude: 0 });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e: any) => {
        var post: Post = {
            userid: userObj._id,
            image: image,
            options: searchValue,
            date: new Date().toISOString(),
            reactions: []
        }
        client.createPost(post);
        post.user = userObj;
        dispatch(addPost(post));
        navigate("/")
    };

    const handleItemClick = (result: any) => {
        setSearchValue({ ...searchValue, 5: result });
        setSearchResults([]);
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
                    setImage(resizedArrayBuffer);
                }
            };
        }
    };

    const handleGetLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    }

    const getCitiesFromLocation = () => {
        handleGetLocation()
        console.log(userLocation)
        const radius = 50000
        const targetLatitude = userLocation.latitude;
        const targetLongitude = userLocation.longitude
        const query = `
          [out:json];
          node
            [place=city]
            (around:${radius},${targetLatitude},${targetLongitude});
          out;
        `;
        const overpassUrl = 'https://overpass-api.de/api/interpreter';
        axios
            .post(overpassUrl, query, {
                headers: {
                    'Content-Type': 'application/xml',
                },
            })
            .then((response) => {
                const nearestCities = response.data.elements
                    .filter((element: { type: string; }) => element.type === 'node')
                    .map((node: { tags: { name: any; }; lat: any; lon: any; }) => ({
                        name: node.tags.name,
                        latitude: node.lat,
                        longitude: node.lon,
                    }));
                setSearchResults(nearestCities)
                setSearchValue({ 1: nearestCities[0].name, 2: nearestCities[1].name, 3: nearestCities[2].name, 4: nearestCities[3].name, 5: "" });
                setShowDropdown(true)
                // Process the nearest cities data as needed
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <Modal style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            }
        }} isOpen={isOpen} onRequestClose={onClose} contentLabel="Create Post">
            <div style={{ textAlign: 'center' }}>
                {image == "" && <svg width="500" height="500" viewBox="0 0 100 100"><rect width="100" height="100" fill="#CCC" /></svg>}
                {image != "" && <img width="500" height="500" style={{ objectFit: 'cover' }} src={image} />}
                <input type="file" className='form-control' id="image" onChange={handleFileChange} />
                <div>
                    {showDropdown && (
                        <div className="dropdown">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                {Object.entries(searchValue).slice(0, 4).map(([key, value], index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            value={value}
                                            checked={searchValue[5] == value}
                                            onChange={() => handleItemClick(value)}
                                            style={{ marginRight: '8px' }}
                                        />
                                        <label>{value}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={getCitiesFromLocation} className='btn btn-primary'>Get Location</button>
                <button className={image == '' || searchValue[5] == '' ? 'btn btn-primary m-2 disabled' : 'btn btn-primary m-2'}
                    onClick={handleSubmit}>Post</button>
                <button className='btn btn-danger m-2' onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    );
};

export default CreatePost;