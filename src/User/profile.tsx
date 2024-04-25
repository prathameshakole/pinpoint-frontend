import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as userClient from './client';
import LeftNav from '../Home/leftnav';
import UserListModal from './userListModal';
import { useDispatch, useSelector } from 'react-redux';
import * as postClient from '../Home/client';
import RightNav from '../Home/rightnav';
import { ClickableImage } from '../Post/clickableImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as userReducer from './reducer'
import LeftNavSm from '../Home/leftnavsm';

const UserProfile = () => {
    const dispatch = useDispatch();
    const [userPosts, setUserPosts] = useState([]);
    const [votedPosts, setVotedPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("posts");
    const loggedInUser = useSelector((state: any) => state.userReducer.user);
    const navigate = useNavigate();
    const { profileId }: any = useParams();
    const [followerIsOpen, setFollowerIsOpen] = useState(false);
    const [followingIsOpen, setFollowingIsOpen] = useState(false);
    const openFollower = (open: boolean) => {
        if (open) {
            setFollowerIsOpen(true)
        }
    };
    const closeFollower = () => setFollowerIsOpen(false);
    const openFollowing = (open: boolean) => {
        if (open) {
            setFollowingIsOpen(true)
        }
    };
    const closeFollowing = () => setFollowingIsOpen(false);
    const [user, setUser] = useState({
        username: "", password: "", bio: "", firstName: "", lastName: "", role: "USER", _id: "", email: "", image: "", following: [], follower: []
    });
    const editProfile = () => {
        navigate('/editprofile');
    };

    const follow = async (add: boolean) => {
        await userClient.follow(loggedInUser._id, profileId, add);
        var newLoggedInUser = loggedInUser;
        var newProfileUser: any = {};
        if (add === true) {
            newLoggedInUser = { ...loggedInUser, following: [...loggedInUser.following, profileId] }
            newProfileUser = { ...user, follower: [...user.follower, loggedInUser._id] }
        } else {
            newLoggedInUser = { ...loggedInUser, following: loggedInUser.following.filter((userid: any) => userid !== profileId) }
            newProfileUser = { ...user, follower: user.follower.filter((userid: any) => userid !== loggedInUser._id) }
        }
        setUser(newProfileUser)
        dispatch(userReducer.setUser(newLoggedInUser));
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (profileId !== undefined) {
                    const response = await userClient.findUserById(profileId);
                    setUser(response);
                }
            } catch (error: any) {
                toast.error(error.response.data);
                console.error('Error fetching user data:', error);
            }
        };
        const fetchUserPosts = async () => {
            const response = await postClient.findUserPost(profileId)
            setUserPosts(response)
        }
        const fetchPostsVotedByUser = async () => {
            const response = await postClient.findPostsVotedByUser(profileId)
            setVotedPosts(response)
        }
        fetchUserData();
        fetchUserPosts();
        fetchPostsVotedByUser();
    }, [profileId]);
    return (
        <div className="container">
            <LeftNavSm />
            <ToastContainer />
            <nav className="nav nav-underline justify-content-center">
                <div className="nav-link active">
                    <h5>Profile</h5>
                </div>
            </nav>
            <div className="row">
                <div className="col-lg-3 d-none d-lg-block">
                    <LeftNav />
                </div>
                <div className="col-12 col-lg-6 mt-4">
                    <div className="card mt-4">
                        <div className="container">
                            <div className="row align-items-center p-4">
                                <div className="col-6 d-flex">
                                    <img
                                        className="me-2"
                                        src={user.image === undefined || user.image === '' ? "/default.jpg" : user.image}
                                        alt="profile-image"
                                        style={{ maxWidth: "80px", borderRadius: '50%' }}
                                    />
                                    <div>
                                        <div className="d-flex align-items-center">
                                            <h5>{'@' + user.username}</h5>
                                        </div>
                                        <h6>{user.firstName + " " + user.lastName}</h6>
                                        {user._id === loggedInUser._id && <h6>{user.email}</h6>}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className='float-end'>
                                        <h5>About</h5>
                                        <h6>{user.bio}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-5 nav">
                                    <UserListModal isOpen={followerIsOpen} onClose={closeFollower} userList={user.follower} />
                                    <Link
                                        className="nav-link"
                                        to={''}
                                        onClick={() => openFollower(user.follower.length !== 0)}
                                    >
                                        <h5>{'Followers ' + user.follower.length}</h5>
                                    </Link>
                                </div>
                                <div className="col-5 nav float-end">
                                    <UserListModal isOpen={followingIsOpen} onClose={closeFollowing} userList={user.following} />
                                    <Link
                                        className="nav-link"
                                        to={''}
                                        onClick={() => openFollowing(user.following.length !== 0)}
                                    >
                                        <h5>{`Following ${user.following.length}`}</h5>
                                    </Link>
                                </div>
                                <div className="col-2 d-flex justify-content-end my-2">
                                    {loggedInUser._id === user._id ? (
                                        <button className="btn btn-primary" onClick={editProfile}>
                                            Edit
                                        </button>
                                    ) : (
                                        <>{loggedInUser._id !== '' && (
                                            <>
                                                {loggedInUser.following.includes(profileId) ? (
                                                    <button className="btn btn-danger" onClick={() => follow(false)}> Unfollow</button>

                                                ) : (
                                                    <button className="btn btn-primary" onClick={() => follow(true)}> Follow</button>
                                                )}
                                            </>
                                        )}
                                        </>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ul className="nav nav-underline justify-content-center mb-3">
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === "posts" ? "active" : ""}`}
                                    onClick={() => setActiveTab("posts")}>
                                    <h5>Posts</h5>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === "votes" ? "active" : ""}`}
                                    onClick={() => setActiveTab("votes")}>
                                    <h5>Votes</h5>
                                </button>
                            </li>
                        </ul>
                        <div className="container">
                            <div className="row justify-content-center">
                                {activeTab === "posts" &&
                                    <div className='row row-cols-1 row-cols-md-3 g-3'>
                                        {userPosts.map((post: any, index: any) => (
                                            <div key={post._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                                <ClickableImage post={post} />
                                            </div>
                                        ))}
                                    </div>
                                }
                                {activeTab === "votes" &&
                                    <div className='row row-cols-1 row-cols-md-3 g-3'>
                                        {votedPosts.map((post: any, index: any) => (
                                            <div key={post._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                                <ClickableImage post={post} />
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <RightNav />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
