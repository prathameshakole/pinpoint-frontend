import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import * as client from '../Home/client'
import { useSelector } from 'react-redux';

const CreatePost = ({ isOpen, onClose }: { isOpen: boolean, onClose: any }) => {
    const [image, setImage] = useState("");
    const user = useSelector((state: any) => state.userReducer.user);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSubmit = (e: any) => {
        const post = {
            userid: user._id,
            image: image,
            options: {
                1: searchValue, 2: searchValue, 3: searchValue, 4: searchValue,
            },
            date: new Date,
            reactions: []
        }
        client.createPost(post);
    };

    const handleSearchChange = (e: any) => {
        setSearchValue(e.target.value);
        if (e.target.value.trim() !== '') {
            fetchSearchResults(e.target.value);
        } else {
            setSearchResults([]);
        }
    };

    const fetchSearchResults = async (value: any) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    city: value,
                    format: 'geojson',
                },
            });
            setSearchResults(response.data.features);
            setShowDropdown(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleItemClick = (result: any) => {
        setSearchValue(result.properties.display_name);
        setSearchResults([]);
        setShowDropdown(false);
    };

    const handleImageUpload = (e: any) => {
        const file = URL.createObjectURL(e.target.files[0]);
        setImage(e.target.files[0]);
    };

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
                <input type="file" className='form-control' id="image" onChange={handleImageUpload} />
                <div>
                    <input
                        className='form-control'
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Enter a city name"
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 500)}
                    />
                    {showDropdown && (
                        <ul className="dropdown">
                            {searchResults.map((result: any) => (
                                <li key={result.properties.place_id} onClick={() => handleItemClick(result)}>
                                    {result.properties.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className='btn btn-primary m-2' onClick={handleSubmit}>Post</button>
            </div>
        </Modal>
    );
};

export default CreatePost;