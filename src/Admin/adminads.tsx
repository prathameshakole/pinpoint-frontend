import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdCard from "../Ads/adcomponent";
import { setAds } from "../Ads/reducer";
import * as client from "../Ads/client"

const AdminAds = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userReducer.user);
    const ads = useSelector((state: any) => state.adReducer.ads);
    useEffect(() => {
        const fetchAds = async () => {
            try {
                const userAds = await client.findAllAds();
                dispatch(setAds(userAds));
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
        };

        fetchAds();
    }, [user._id, dispatch]);
  
    return (
        <div className='m-4'>
            {ads.map((ad: any) => (
                            <AdCard
                                ad={ad}
                                editable={false}
                                approvable={true}
                            />
                        ))}
        </div>
    );
  };
  export default AdminAds;