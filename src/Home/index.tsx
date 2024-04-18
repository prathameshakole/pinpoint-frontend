import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Routes, Route, Navigate } from "react-router";
import * as client from '../User/client'
import { resetUser } from '../User/reducer'
import Following from './following';
import Trending from './trending';
import { useState } from 'react';
import CreatePost from '../Post/Create';

const Home = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignout = async () => {
    await client.signout();
    dispatch(resetUser());
    navigate("/");
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <nav className="nav nav-underline justify-content-center">
        <Link to="/home/trending" className={`nav-link ${pathname.includes("trending") ? "active" : ""}`}>Trending</Link>
        {localStorage.getItem("token") != null &&
          <Link to="/home/following" className={`nav-link ${pathname.includes("following") ? "active" : ""}`}>Following</Link>
        }
      </nav>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            {localStorage.getItem("token") != null && <button onClick={handleSignout} className='btn btn-warning'> Sign out </button>}
            {localStorage.getItem("token") == null && <Link className='btn btn-primary' to={`/signin/`}>Sign in </Link>}
          </div>
          <div className='col-md-6'>
            <Routes>
              <Route path="*" element={<Navigate to="/home/trending" />} />
              <Route path="trending" element={<Trending />} />
              <Route path="following" element={<Following />} />
            </Routes>
          </div>
          <div className='col-md-3'>

          </div>
        </div>
      </div>
      <button className='btn btn-primary' onClick={openModal}>Post</button>
      <CreatePost isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
};
export default Home;
