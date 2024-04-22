import { Link, useNavigate } from 'react-router-dom';
import * as client from '../User/client';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../User/reducer';
import CircularSearchBox from '../Search/searchBar';

const LeftNav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userReducer.user);
    const handleSignout = async () => {
        await client.signout();
        dispatch(resetUser());
        navigate("/");
    };

    return (
        <div className="d-none d-lg-block col-lg-3 p-4 position-fixed card" style={{ top: 0, left: 0, height: '100vh' }}>
            <Link to="/home/trending" className="d-flex align-items-center mb-3 text-decoration-none fs-4">
                Pin Point
            </Link>
            <CircularSearchBox />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/home/trending" className="nav-link w-100 mb-2" aria-current="page">
                        <h5>Home</h5>
                    </Link>
                </li>
                {localStorage.getItem("token") !== null ? (
                    <>
                        <Link to={"/profile/" + user._id} className="nav-link w-100 mb-2"><h5>Profile</h5></Link>
                        {user.role === 'ADVERTISER' &&
                            <Link to="/ads" className="nav-link w-100 mb-2"><h5>My Ads</h5></Link>
                        }
                        {user.role === 'ADMIN' &&
                            <Link to="/admin/ads" className="nav-link w-100 mb-2"> <h5>Admin Panel</h5></Link>
                        }
                        <Link onClick={handleSignout} className="nav-link w-100 mb-2" to={''}><h5>Sign out</h5></Link>
                    </>
                ) : <Link to="/signin" className="nav-link w-100"><h5>Sign in</h5></Link>}
            </ul>
        </div>

    );
};
export default LeftNav;
