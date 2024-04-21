import { useDispatch, useSelector } from 'react-redux';
import * as client from './client'
import { setFollowingPosts } from "./reducer"
import Post from '../Post/post';
import { useEffect } from 'react';

const Following = () => {
  const dispatch = useDispatch()
  const followingPosts = useSelector((state: any) => state.postsReducer.followingPosts);
  const { _id } = useSelector((state: any) => state.userReducer.user);
  const fetchPosts = async () => {
      const posts = await client.findFollowingPosts(_id)
      dispatch(setFollowingPosts(posts))
  }

  useEffect(() => {
      fetchPosts()
  }, [_id]);

  return (
      <div className='m-4'>
          {followingPosts.map((post: any, index: any) => (
              <Post key={post._id} post={post}/>
          ))}
      </div>
  );
};
export default Following;
