import { useSelector } from 'react-redux';
import AdCard from '../Ads/adcomponent';
import { useState, useEffect } from 'react';
import * as adClient from '../Ads/client'
import * as userClient from '../User/client';
import UserList from '../User/UserList';

const RightNav = () => {
    const user = useSelector((state: any) => state.userReducer.user);
    const [ad, setAd] = useState({
        _id: "",
        userid: "",
        image: "",
        title: "",
        description: "",
        totalImpressions: 0,
        date: "",
        approved: false,
        url: ""
    })
    const [followers, setFollowers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            const f = await userClient.findUsers(user.follower);
            setFollowers(f)
        };
        fetchUsers();
    }, [user]);

    const [following, setFollowing] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            const f = await userClient.findUsers(user.following);
            setFollowing(f)
        };
        fetchUsers();
    }, [user]);

    useEffect(() => {
        const getRandomAd = async () => {
            const ad = await adClient.getRandomAd();
            setAd(ad)
        }
        getRandomAd()
    }, [])
    console.log(user.follower)
    return (
        <div>
            {user._id !== '' &&
                <div>
                    <h5 className='p-4 pb-0'>Following</h5>
                    <div className="container p-4">
                        <UserList users={following} />
                    </div>
                    <h5 className='p-4 pb-0'>Followers</h5>
                    <div className="container p-4">
                        <UserList users={followers} />
                    </div>
                </div>}
            <h5 className='p-4 pb-0'>Ad</h5>
            <AdCard ad={ad}
                editable={false}
                approvable={false} />
        </div>

    );
};
export default RightNav;
