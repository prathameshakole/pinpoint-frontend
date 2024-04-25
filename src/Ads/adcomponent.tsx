import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as adClient from './client';
import * as adReducer from './reducer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdCard = ({ ad, editable, approvable }: { ad: any, editable: any, approvable: any }) => {
    const currentAd = useSelector((state: any) => state.adReducer.ad);
    const dispatch = useDispatch();
    const handleUpdateClick = async (ad: any) => {
        dispatch(adReducer.setAd(ad));
    };

    const handleUpdateSubmit = async (e: any) => {
        try {
            await adClient.updateAd(currentAd._id, currentAd);
            dispatch(adReducer.updateAd(currentAd));
            dispatch(adReducer.resetAd());
        } catch (error:any) {
            toast.error(error.response.data);
            console.error('Error updating ad:', error);
        }
    };

    const handleDeleteClick = async (adId: string) => {
        try {
            await adClient.deleteAd(adId);
            dispatch(adReducer.deleteAd(adId));
        } catch (error:any) {
            toast.error(error.response.data);
            console.error('Error deleting ad:', error);
        }
    };

    const handleApproved = async (ad: any) => {
        try {
            await adClient.updateAd(ad._id, { ...ad, approved: true })
            dispatch(adReducer.updateAd({ ...ad, approved: true }));
        } catch (error:any) {
            toast.error(error.response.data);
            console.error('Error approving ad:', error);
        }
    };
    return (
        <div className="card m-4">
            <ToastContainer/>
            {currentAd && currentAd._id === ad._id ? (
                <form onSubmit={handleUpdateSubmit}>
                    <div className='ratio ratio-1x1'>
                        <img src={ad.image} alt="Ad" className="card-img-top" style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }} />
                    </div>
                    <input className='form-control mt-2'
                        type="text"
                        value={currentAd.title}
                        onChange={(e) => dispatch(adReducer.setAd({ ...currentAd, title: e.target.value }))}
                    />
                    <input className='form-control mt-3'
                        type="text"
                        value={currentAd.description}
                        onChange={(e) => dispatch(adReducer.setAd({ ...currentAd, description: e.target.value }))}
                    />
                    <input className="form-control mt-3" type="text" value={currentAd.url} onChange={(e) => dispatch(adReducer.setAd({...currentAd, url : e.target.value}))} />
                    <button className='nav-link w-100 mt-4' type="submit">Save</button>
                </form>
            ) : (
                <div>
                    <div className="container">
                        <div className="row">
                                <Link className="nav-link ms-2" to={`/ads`}>
                                    {ad.title}
                                </Link>
                        </div>
                    </div>
                    <div className='ratio ratio-1x1'>
                        <img src={ad.image} alt="Ad" className="card-img-top" style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }} />
                    </div>
                    <div className='container m-2'>
                        <div className="row">
                            <p className="card-text">{ad.description}</p>
                        </div>
                        <div className="row nav ">
                            <a className='nav-link pt-0'  href={`https://${ad.url}`} target="_blank" rel="noopener noreferrer">{ad.url}</a>
                        </div>
                        {editable && (
                            <div className="row">
                                <div className="col-6">
                                    <p className="card-text"><h5>Impressions: {ad.totalImpressions}</h5></p>
                                </div>
                                <div className="col-6">
                                    <p className="card-text"><h5>Approved : {ad.approved === true ? "Yes" : "No"}</h5></p>
                                </div>
                            </div>
                        )}
                    </div>
                    {editable && (
                        <>
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <button onClick={() => handleUpdateClick(ad)} className="btn btn-primary w-100 mb-2">
                                            Update
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-primary w-100 mb-2" onClick={() => handleDeleteClick(ad._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {approvable && (
                        <div className="container">
                            <div className="row p-2">
                                {ad.approved === false && <button onClick={() => handleApproved(ad)} className="btn btn-primary">
                                    Approve
                                </button>}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdCard;