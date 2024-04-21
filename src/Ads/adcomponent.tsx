import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setAds, deleteAd, updateAd, approveAd } from './reducer';
import { useDispatch } from 'react-redux';
import * as adClient from './client';

const AdCard = ({ ad, editable, approvable }: { ad: any, editable: any, approvable: any }) => {
    const [updatedAd, setUpdatedAd] = useState<any>(null);
    const dispatch = useDispatch();
    const [image, setImage] = useState("");
    const handleUpdateClick = async (ad: any) => {
        setUpdatedAd(ad);
    };

    const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedData = await adClient.updateAd(updatedAd._id, updatedAd);
            dispatch(updateAd(updatedData));
            setUpdatedAd(null);
        } catch (error) {
            console.error('Error updating ad:', error);
        }
    };

    const handleDeleteClick = async (adId: string) => {
        try {
            await adClient.deleteAd(adId);
            dispatch(deleteAd(adId));
        } catch (error) {
            console.error('Error deleting ad:', error);
        }
    };
    useEffect(() => {
        const fetchUpdatedAds = async () => {
            try {
                const userAds = await adClient.findAllAds();
                dispatch(setAds(userAds));
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
        };

        fetchUpdatedAds();
    }, [dispatch])

    const fetchUpdatedAds = async () => {
        try {
            const userAds = await adClient.findAllAds();
            dispatch(setAds(userAds));
        } catch (error) {
            console.error('Error fetching ads:', error);
        }
    };

    const handleApproved = async (ad: any) => {
        try {
            dispatch(approveAd(ad._id));
            await fetchUpdatedAds();
        } catch (error) {
            console.error('Error approving ad:', error);
        }
    };

   

    return (
        <div key={ad._id} className="card m-4 col-7">
            {updatedAd && updatedAd._id === ad._id ? (
                <form onSubmit={handleUpdateSubmit}>
                    <img src={ad.image} alt="Ad" className="card-img-top" />
                    <input className='form-control'
                        type="text"
                        value={updatedAd.title}
                        onChange={(e) => setUpdatedAd({ ...updatedAd, title: e.target.value })}
                    />
                    <input className='form-control mt-4'
                        type="text"
                        value={updatedAd.description}
                        onChange={(e) => setUpdatedAd({ ...updatedAd, description: e.target.value })}
                    />
                    <button className='nav-link w-100 mt-4' type="submit">Save</button>
                </form>
            ) : (
                <div className="card">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 mt-2">
                                <Link className="nav-link" to={`/ads`}>
                                    <h5>{ad.title}</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <img src={ad.image} alt="Ad" className="card-img-top" />
                    <div className='container'>
                        <div className="row">
                            <p className="card-text ms-3 mt-2">{ad.description}</p>
                        </div>
                        {editable && (
                            <>
                                <div className="row">
                                    <div className="col-6">
                                        <p className="card-text m-3">Impressions: {ad.totalImpressions}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="card-text m-3">Approved : {ad.Approved ? "Yes" : "No"} </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {editable && (
                        <>
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <button onClick={() => handleUpdateClick(ad)} className="nav-link w-100 mb-2">
                                            Update
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className="nav-link w-100 mb-2" onClick={() => handleDeleteClick(ad._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {approvable && (
                        <>
                            <div className="container">
                                <div className="row me-4">
                                    <button onClick={() => handleApproved(ad)} className="nav-link w-100 mb-2">
                                        Approve
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdCard;