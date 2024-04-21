import { useDispatch, useSelector } from 'react-redux';
import * as client from './client'
import { setFollowingPosts } from "./reducer"
import Post from '../Post/post';
import { useEffect } from 'react';
import axios from 'axios';

// const targetLatitude = 40.845417; // Example: London
// const targetLongitude = -73.935713;
// const radius = 50000; // 50 km radius

// const query = `
//   [out:json];
//   node
//     [place=city]
//     (around:${radius},${targetLatitude},${targetLongitude});
//   out;
// `;

// const overpassUrl = 'https://overpass-api.de/api/interpreter';

// axios
//   .post(overpassUrl, query, {
//     headers: {
//       'Content-Type': 'application/xml',
//     },
//   })
//   .then((response) => {
//     const nearestCities = response.data.elements
//       .filter((element: { type: string; }) => element.type === 'node')
//       .map((node: { tags: { name: any; }; lat: any; lon: any; }) => ({
//         name: node.tags.name,
//         latitude: node.lat,
//         longitude: node.lon,
//       }));

//     console.log(nearestCities);
//     // Process the nearest cities data as needed
//   })
//   .catch((error) => {
//     console.error(error);
//   });


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
