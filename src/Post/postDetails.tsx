import { Routes, Route, Navigate, useParams } from "react-router"
import LeftNav from "../Home/leftnav"
import RightNav from "../Home/rightnav"
import { useDispatch, useSelector } from "react-redux"
import * as client from "../Home/client"
import { setPosts } from "../Home/reducer"
import { useEffect, useState } from "react"
import Post from "./post"

export const PostDetails = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const [currentPost, setCurrentPost] = useState(null);

    const user = useSelector((state: any) => state.userReducer.user);

    const findPost = async () => {
        const currentPostsByUser = await client.getPostById(postId);
        setCurrentPost(currentPostsByUser);
    }

    useEffect(() => {
        findPost();
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-3 d-block-lg'>
                    <LeftNav />
                </div>
                <div className='col-lg-6'>
                {currentPost && <Post key={postId} post={currentPost} />}
                </div>
                <div className='col-lg-3 d-block-lg'>
                    <RightNav />
                </div>
            </div>
        </div>
    )
}
