import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdCard from "../Ads/adcomponent";
import { setAds } from "../Ads/reducer";
import * as client from "../Ads/client"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAds = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userReducer.user);
    const ads = useSelector((state: any) => state.adReducer.ads);
    useEffect(() => {
        const fetchAds = async () => {
            try {
                const userAds = await client.findAllAds();
                dispatch(setAds(userAds));
            } catch (error :any ) {
                toast.error(error.response.data);
                console.error('Error fetching ads:', error);
            }
        };

        fetchAds();
    }, [user._id, dispatch]);

    return (
        <div className="row row-cols-1 row-cols-lg-2 row-cols-md-2 g-3">
            <ToastContainer/>
            {ads
                .filter((e: any) => e.approved === false)
                .map((ad: any) => (
                    <div key={ad._id} className="col-12 col-md-6 d-flex">
                        <div className="h-100 w-100">
                            <AdCard ad={ad} editable={false} approvable={true} />
                        </div>
                    </div>
                ))}
        </div>
    );
};
export default AdminAds;