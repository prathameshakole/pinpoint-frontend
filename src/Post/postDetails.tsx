import { useParams } from "react-router"
import LeftNav from "../Home/leftnav"
import RightNav from "../Home/rightnav"
import { useSelector } from "react-redux"
import * as client from "../Home/client"
import { useEffect, useState } from "react"
import Post from "./post"

export const PostDetails = () => {
    const { postId } = useParams();
    const [currentPost, setCurrentPost] = useState(null);

    const user = useSelector((state: any) => state.userReducer.user);

    const findPost = async () => {
        const currentPostsByUser = await client.getPostById(postId);
        setCurrentPost(currentPostsByUser);
    }

    useEffect(() => {
        findPost();
    }, [currentPost]);

    return (
        <div className='container'>
            <nav className="nav nav-underline justify-content-center">
                <div className="nav-link active">
                    <h5>Post</h5>
                </div>
            </nav>
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
