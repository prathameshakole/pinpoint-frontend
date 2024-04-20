import { useDispatch, useSelector } from 'react-redux';
import * as client from './client'
import { setPosts } from "./reducer"
import Post from '../Post/post';
import { useEffect } from 'react';

const Trending = () => {
    const dispatch = useDispatch()
    const trendingPosts = useSelector((state: any) => state.postsReducer.trendingPosts);
    const fetchPosts = async () => {
        const posts = await client.findTrendingPosts()
        dispatch(setPosts(posts))
    }

    useEffect(() => {
        fetchPosts()
    }, []);

    return (
        <div className='m-4'>
            {trendingPosts.map((post: any, index: any) => (
                <Post key={post._id} post={post}/>
            ))}
        </div>
    );
};
export default Trending;
