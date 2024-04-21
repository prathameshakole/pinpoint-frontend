import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { useDispatch } from "react-redux";
import Profile from './User/profile';
import Home from './Home'
import * as client from "../src/User/client";
import { setUser } from '../src/User/reducer'
import Auth from './User/auth';
import Ad from './Ads/ad';
import Admin from './Admin/admin';
import EditProfile from './User/editProfile';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') !== null
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('token') !== null);
    const fetchProfile = async () => {
      try {
        const account = await client.profile();
        return account;
      } catch (e) {
        localStorage.removeItem('token')
      }
    };
    fetchProfile().then((e) => {
      if (e != null) {
        dispatch(setUser(e));
      }
    });
  }, [localStorage.getItem('token')]);
  return (
    <HashRouter>
        <Routes>
          <Route path="/home/*" element={<Home />} />
          <Route path='/signin' element={<Auth />} />
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/ads" element={<Ad />}></Route>
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="*" element={<Navigate to="/home/trending" />} />
        </Routes>
    </HashRouter >
  );
}

export default App;
