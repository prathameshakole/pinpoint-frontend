import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";

const Post = ({ post } : { post: any }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className='card m-4 shadow-lg'>
            {post.userid}
            <img src={`${post.image}`} alt="image" />
            <div>
                <FaRegHeart />
            </div>
        </div>
    );
};
export default Post;
