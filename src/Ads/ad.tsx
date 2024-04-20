import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from './client';
import { setAd, updateAd, deleteAd } from './reducer';

const Ad = () => {
    const { adId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ad = useSelector((state: any) => state.adReducer.ad);
    const user = useSelector((state: any) => state.userReducer.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const fetchedAd = await client.findAdsByUser(user._id);
                dispatch(setAd(fetchedAd));
                setTitle(fetchedAd.title);
                setDescription(fetchedAd.description);
                setImage(fetchedAd.image);
            } catch (error) {
                console.error('Error fetching ad:', error);
            }
        };

        fetchAd();
    }, [adId, dispatch]);

    const handleUpdate = async () => {
        if (adId) {
            const updatedAd = {
                ...ad,
                title,
                description,
                image,
            };

            try {
                const response = await client.updateAd(adId, updatedAd);
                dispatch(updateAd(response));
                navigate('/');
            } catch (error) {
                console.error('Error updating ad:', error);
            }
        }
    };

    const handleDelete = async () => {
        if (adId) {
            try {
                await client.deleteAd(adId);
                dispatch(deleteAd(adId));
                navigate('/');
            } catch (error) {
                console.error('Error deleting ad:', error);
            }
        }
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        }
    };

    return (
        <div>
            {image === '' && <svg width="500" height="500" viewBox="0 0 100 100"><rect width="100" height="100" fill="#CCC" /></svg>}
            {image !== '' && <img width="500" height="500" style={{ objectFit: 'cover' }} src={image} alt="Ad Image" />}
            <input type="file" className='form-control' id="image" onChange={handleFileChange} />
            <input
                className='form-control'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter ad title"
            />
            <input
                className='form-control'
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter ad description"
            />
            {user._id === ad.userid && (
                <>
                    <button className='btn btn-primary m-2' onClick={handleUpdate}>Update Ad</button>
                    <button className='btn btn-danger m-2' onClick={handleDelete}>Delete Ad</button>
                </>
            )}
        </div>
    );
};

export default Ad;