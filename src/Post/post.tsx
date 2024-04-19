import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import * as postClient from '../Home/client';
import { updatePost } from '../Home/reducer';

const Post = ({ post }: { post: any }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userReducer.user);

    const react = async (add: boolean) => {
        var newPost = {}
        if (add) {
            newPost = { ...post, reactions: [...post.reactions, user._id] }
        } else {
            newPost = { ...post, reactions: post.reactions.filter((userid: any) => userid != user._id) }
        }
        await postClient.updatePost(post._id, newPost);
        dispatch(updatePost(newPost));
    }

    const castVote = async (option: any) => {
        const newVotes = { ...post.votes, [user._id]: option };
        console.log(newVotes);
        const newPost = { ...post, votes: newVotes };
        console.log(newPost);
        await postClient.updatePost(post._id, newPost);
        dispatch(updatePost(newPost));
    };

    return (
        <div className='card m-4 shadow-lg'>
            {post.userid}
            <img src={`${post.image}`} alt="image" />
            {user._id != '' ? <div>
                {post.reactions.includes(user._id) ? (<FaHeart onClick={() => react(false)} />) : (<FaRegHeart onClick={() => react(true)} />)}
                {post.reactions.length > 0 && (' ' + post.reactions[0] + ', and ' + (post.reactions.length - 1) + ' more')}
            </div> : 
            <div>
            {post.reactions.length > 0 && (' ' + post.reactions[0] + ', and ' + (post.reactions.length - 1) + ' more')}
        </div>}
            {user._id != '' && (
                <div>
                    {post.votes && user._id in post.votes ? (<div className="container">
                        <p>{`Voted - ${post.options[post.votes[user._id]]}`}</p>
                        <p>{`Answer - ${post.options[1]}`}</p>
                    </div>) : (<div className="container">
                        <div className="row">
                            <button className='col-6' onClick={() => castVote(1)}>{post.options[1]}</button>
                            <button className='col-6' onClick={() => castVote(2)}>{post.options[2]}</button>
                        </div>

                        <div className="row">
                            <button className='col-6' onClick={() => castVote(3)}>{post.options[3]}</button>
                            <button className='col-6' onClick={() => castVote(4)}>{post.options[4]}</button>
                        </div>
                    </div>)}
                </div>
            )}
        </div>
    );
};
export default Post;
