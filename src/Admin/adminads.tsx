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
        <div className='row row-cols-1 row-cols-md-3 g-3'>
            {ads.filter((e: any) => e.approved == false).map((ad: any) => (
                <div key={ad._id} className="col-lg-6 col-md-12 d-flex">
                    <AdCard
                        ad={ad}
                        editable={false}
                        approvable={true}
                    />
                </div>

            ))}
        </div>
    );
};
export default AdminAds;