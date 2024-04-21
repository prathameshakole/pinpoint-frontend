import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as client from '../Ads/client';
import { setAds } from '../Ads/reducer';
import { Link, useNavigate } from 'react-router-dom';
import LeftNav from '../Home/leftnav';
import AdCard from '../Ads/adcomponent';

const Admin = () => {
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.userReducer.user);
  const ads = useSelector((state: any) => state.adReducer.ads);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user._id == undefined || user._id == '' || user.role != 'ADMIN') {
      navigate("/")
    }
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
    <div>
      <nav className="nav nav-underline justify-content-center">
        <Link to="/ads" className="nav-link">
          <h5>Available Ads</h5>
        </Link>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-lg-3 d-block-lg">
            <LeftNav />
          </div>
          <div className="col ps-4">
            {ads.map((ad: any) => (
              <AdCard
                ad={ad}
                editable={false}
                approvable={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;