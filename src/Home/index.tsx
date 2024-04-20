import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Routes, Route, Navigate } from "react-router";
import Following from './following';
import Trending from './trending';
import LeftNav from './leftnav';
import { useState } from 'react';
import CreatePost from '../Post/Create';
import CreateAd from '../Ads/create';

const Home = () => {
  const { pathname } = useLocation();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <nav className="nav nav-underline justify-content-center">
        <Link to="/home/trending" className={`nav-link ${pathname.includes("trending") ? "active" : ""}`}><h5>Trending</h5></Link>
        {localStorage.getItem("token") != null &&
          <Link to="/home/following" className={`nav-link ${pathname.includes("following") ? "active" : ""}`}><h5>Following</h5></Link>
        }
      </nav>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3 d-block-lg'>
            <LeftNav />
          </div>
          <div className='col-lg-6'>
            <Routes>
              <Route path="trending" element={<Trending />} />
              <Route path="following" element={<Following />} />
            </Routes>
            <button className='btn btn-primary' onClick={openModal}>Post</button>
            <CreatePost isOpen={modalIsOpen} onClose={closeModal} />

            <button className='btn btn-primary' onClick={openModal}>Ads</button>
            <CreateAd isOpen={modalIsOpen} onClose={closeModal} />
          </div>
          <div className='col-lg-3'>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
