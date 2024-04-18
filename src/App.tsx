import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { useDispatch } from "react-redux";
import Profile from './User/profile';
import Home from './Home'
import * as client from "../src/User/client";
import { setUser } from '../src/User/reducer'
import Auth from './User/auth';
import CreatePost from './Post/Create';



const fetchProfile = async () => {
  try {
    const account = await client.profile();
    return account;
  } catch (e) {
    localStorage.removeItem('token')
  }
};

function App() {
  const dispatch = useDispatch();
  fetchProfile().then(e => {
    if (e != null) {
      dispatch(setUser(e))
    }
  });
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/home/*" element={<Home />} />
          <Route path='/signin' element={localStorage.getItem('token') != null? <Navigate to="/" replace /> :<Auth />} />
          <Route path="/profile/*" element={localStorage.getItem('token') == null ? <Navigate to="/" replace /> : <Profile />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
