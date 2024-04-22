import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Routes, Route, Navigate } from "react-router";
import Following from './following';
import Trending from './trending';
import LeftNav from './leftnav';
import { useEffect, useState } from 'react';
import CreatePost from '../Post/Create';
import * as adClient from '../Ads/client'
import AdCard from '../Ads/adcomponent';

const Home = () => {
  const { pathname } = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ad, setAd] = useState({
    userid: "",
    image: "",
    title: "",
    description: "",
    totalImpressions: 0,
    date: "",
    approved: false,
    url: ""
  })
  const user = useSelector((state: any) => state.userReducer.user);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    const getRandomAd = async () => {
      const ad = await adClient.getRandomAd();
      setAd(ad)
    }
    getRandomAd()
  }, [])
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
            {user._id != '' && <div className='mt-4' style={{ textAlign: "center" }}>
              <button className='btn btn-primary' onClick={openModal}>Post</button>
              <CreatePost isOpen={modalIsOpen} onClose={closeModal} />
            </div>}
            <Routes>
              <Route path="/trending" element={<Trending />} />
              <Route path="/following" element={<Following />} />
              <Route path='*' element={<Navigate to={'/'} />} />
            </Routes>
          </div>
          <div className='col-lg-3 d-none d-lg-block position-fixed' style={{ top: '25%', right: 0, height: '100vh' }}>
            <AdCard ad={ad}
              editable={false}
              approvable={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
