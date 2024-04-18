import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const POSTS_API = `${BASE_API}/api/posts`;

const api = axios.create({
    withCredentials: true
})

export const findTrendingPosts = async () => {
    const response = await api.get(`${POSTS_API}/trending`);
    return response.data;
};

export const createPost = async (post: any) => {
    const token = localStorage.getItem('token');
    console.log(post)
    const Response = await api.post(`${POSTS_API}`, post, {headers: { 'Authorization': `Bearer ${token}`,}})
    return Response.data;
}

export const findUserPost = async (userid: any) => {
    const Response = await api.post(`${POSTS_API}/${userid}`)
    return Response.data;
}