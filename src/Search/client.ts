import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const SEARCH_API = `${BASE_API}/api/search`;

const api = axios.create({
    withCredentials: true
})

export const searchUsers = async (searchTerm: any) => {
    const response = await api.get(`${SEARCH_API}/users/${searchTerm}`);
    return response.data;
};

export const searchPosts = async (searchTerm: any) => {
    const response = await api.get(`${SEARCH_API}/posts/${searchTerm}`);
    return response.data;
};

export const searchCities = async (searchTerm: any) => {
};