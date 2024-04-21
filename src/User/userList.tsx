import { Link } from 'react-router-dom';
import * as userClient from './client';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const UserList = ({ isOpen, onClose, userList }: { isOpen: boolean, onClose: any, userList: any }) => {
    const [followers, setFollowers] = useState([])
    useEffect(() => {
        const fetchFollowers = async () => {
            const f = await userClient.findUsers(userList);
            setFollowers(f)
        };
        fetchFollowers();
    }, [userList]);

    return (
        <Modal style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            }
        }} isOpen={isOpen} onRequestClose={onClose} contentLabel="Create Post">
            {followers.map((user: any, index: any) => (
                <div className='container'>
                    <div className="row">
                        <div className="col-6">
                        <img src={user.image == undefined || user.image == '' ? "/default.jpg" : user.image} alt='profile-image' style={{ maxWidth: "40px" }} />
                        <Link to={'/profile/' + user._id}><h6>{user.username}</h6></Link>
                        </div>
                        <div className='col-6'>
                        <Link className='float-end' to={'/profile/' + user._id}><h6>Profile</h6></Link>
                        </div>
                    </div>
                </div>
            ))}
        </Modal>
    );
};
export default UserList;
