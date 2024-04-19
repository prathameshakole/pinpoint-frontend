import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as client from '../User/client'
import { resetUser } from '../User/reducer'

import axios from 'axios';

const targetLatitude = 40.845417; // Example: London
const targetLongitude = -73.935713;
const radius = 50000; // 50 km radius

const query = `
  [out:json];
  node
    [place=city]
    (around:${radius},${targetLatitude},${targetLongitude});
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
    const nearestCities = response.data.elements
      .filter((element: { type: string; }) => element.type === 'node')
      .map((node: { tags: { name: any; }; lat: any; lon: any; }) => ({
        name: node.tags.name,
        latitude: node.lat,
        longitude: node.lon,
      }));

    console.log(nearestCities);
    // Process the nearest cities data as needed
  })
  .catch((error) => {
    console.error(error);
  });


const Following = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
        </>
    );
};
export default Following;
