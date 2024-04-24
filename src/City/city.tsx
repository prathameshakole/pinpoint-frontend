import LeftNav from "../Home/leftnav";
import RightNav from "../Home/rightnav";
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as searchClient from '../Search/client'
import { ClickableImage } from "../Post/clickableImage";
import _ from 'lodash';
import logo from '../logo.png'

export const City = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('name')

  useEffect(() => {
    const searchPosts = async () => {
      try {
        if (searchTerm !== undefined) {
          const response = await searchClient.searchPosts(searchTerm);
          setPosts(response);
        }
      } catch (error: any) {
        toast.error(error.response.data);
        console.error("Error fetching user data:", error);
      }
    };
    searchPosts();
  }, [searchTerm]);
  return (
    <div className='container'>
      <nav className="nav nav-underline justify-content-center">
        <div className="nav-link active">
          <h5>City</h5>
        </div>
      </nav>
      <div className='row'>
        <div className='col-lg-3 d-block-lg'>
          <LeftNav />
        </div>
        <div className='col-lg-6'>
          <div className="card p-2 m-4">
            <div className="row">
              <div className="col-3">
                {posts.length > 0 ? 
                <ClickableImage post={_.sample(posts)} /> 
                : <img src={logo} alt="city image" className="card-img-top" style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }} />}
              </div>
              <div className="col-9">
                <div className="row">
                  <h5>{searchParams.get('name')}</h5>
                  <p>{searchParams.get('display_name')}</p>
                </div>
                <div className="row">
                  <div className="col-6">
                    {'latitude: ' + searchParams.get('latitude')}
                    <br />
                    {'longitude: ' + searchParams.get('longitude')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row m-3">
            <nav className="nav nav-underline justify-content-center pb-2">
              <div className="nav-link active">
                <h5>Posts</h5>
              </div>
            </nav>
            {posts.slice(0, 10).map((post: any) => (
              <div key={post._id} className="col-md-6 mb-4">
                <ClickableImage post={post} />
              </div>
            ))}
          </div>
        </div>
        <div className='col-lg-3 d-block-lg'>
          <RightNav />
        </div>
      </div>
    </div>
  )
};
