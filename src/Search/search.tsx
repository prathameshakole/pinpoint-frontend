import { useLocation } from 'react-router-dom';
import LeftNav from '../Home/leftnav';
import { useEffect, useState } from 'react';

const Search = () => {
  const { pathname } = useLocation();
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [cities, setCities] = useState([])


  useEffect(() => {
    const searchUsers = async () => {
      
    }
    const searchPosts = async () => {
      
    }
    const searchCities = async () => {
      
    }
  }, [pathname])
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4 d-block-lg'>
          <LeftNav />
        </div>
        <div className='col-lg-8 col-12'>
          <nav className="nav nav-underline justify-content-center">
            <div className="nav-link active">
              <h5>Search</h5>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h5>Users</h5>
              </div>
              <div className="col-lg-4">
                <h5>Cities</h5>
              </div>
              <div className="col-lg-4">
                <h5>Posts</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
