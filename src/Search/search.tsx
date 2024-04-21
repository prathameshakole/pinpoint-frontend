import { useLocation, useParams } from 'react-router-dom';
import LeftNav from '../Home/leftnav';
import { useEffect, useState } from 'react';
import * as searchClient from './client'
import Post from '../Post/post';
import axios from 'axios';
import { SearchUser } from './searchUser';
import { SearchCities } from './searchCities';
import { SearchPosts } from './searchPosts';

const Search = () => {
  const { searchTerm } = useParams();
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [cities, setCities] = useState([])
  const [activeTab, setActiveTab] = useState('users');

  const fetchCities = async (value: any) => {
    const query = `
    [out:json];
    node
      [place=city]
      [name~${value},i];
    out;
  `;
  const overpassUrl = 'https://overpass-api.de/api/interpreter';
  axios
      .post(overpassUrl, query, {
          headers: {
              'Content-Type': 'application/xml',
          },
      })
      .then((response) => {
          const cities = response.data.elements
              .filter((element: { type: string; }) => element.type === 'node')
              .map((node: { tags: { name: any; }; lat: any; lon: any; }) => ({
                  name: node.tags.name,
                  latitude: node.lat,
                  longitude: node.lon,
              }));
          setCities(cities)
          console.log(cities)
      })
      .catch((error) => {
          console.error(error);
      });
  };

  useEffect(() => {
    const searchUsers = async () => {
      try {
        if (searchTerm != undefined) {
          const response = await searchClient.searchUsers(searchTerm);
          setUsers(response);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    const searchPosts = async () => {
      try {
        if (searchTerm != undefined) {
          const response = await searchClient.searchPosts(searchTerm);
          setPosts(response);

        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    
    const searchCities = async () => {
      try {
        if (searchTerm != undefined) {
          await fetchCities(searchTerm)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    searchUsers();
    searchPosts();
    searchCities();
  }, [searchTerm])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4 d-none d-lg-block'>
          <LeftNav />
        </div>
        <div className='col-lg-8 col-12'>
          <nav className="nav nav-underline justify-content-center">
            <div className="nav-link active">
              <h5>Search</h5>
            </div>
          </nav>
          <ul className="nav nav-underline justify-content-center mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                Users
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'cities' ? 'active' : ''}`}
                onClick={() => setActiveTab('cities')}
              >
                Cities
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`}
                onClick={() => setActiveTab('posts')}
              >
                Posts
              </button>
            </li>
          </ul>
          <div className="container">
            <div className="row justify-content-center">
              {activeTab === 'users' && <SearchUser users={users}/>}
              {activeTab === 'cities' && <SearchCities cities={cities}/>}
              {activeTab === 'posts' && <SearchPosts posts={posts}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;