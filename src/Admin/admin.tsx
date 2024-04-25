import { Link, Route, Routes, useLocation } from 'react-router-dom';
import LeftNav from '../Home/leftnav';
import LeftNavSm from '../Home/leftnavsm';
import AdminAds from './adminads';
import AdminUsers from './adminusers';
import RightNav from '../Home/rightnav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const { pathname } = useLocation();

    return (
        <div>
            <LeftNavSm />
            <nav className="nav nav-underline justify-content-center">
                <Link to="/admin/ads" className={`nav-link ${pathname.includes("admin/ads") ? "active" : ""}`}><h5>Approve Ads</h5></Link>
                <Link to="/admin/users" className={`nav-link ${pathname.includes("admin/users") ? "active" : ""}`}><h5>Manage Users</h5></Link>
            </nav>
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <LeftNav />
                    </div>
                    <div className="col-lg-6">
                        <Routes>
                            <Route path="ads" element={<AdminAds />} />
                            <Route path="users" element={<AdminUsers />} />
                        </Routes>
                    </div>
                    <div className="col-3">
                        <RightNav />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;