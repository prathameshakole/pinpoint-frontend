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
        <Modal
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '90%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                },
            }}
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Create Post"
        >
            <div className="container">
                {followers.map((user: any, index) => (
                    <div key={index} className="row mb-3 align-items-center">
                        <div className="col-md-6 col-sm-12 d-flex align-items-center">
                            <img
                                src={user.image === undefined || user.image === '' ? "/default.jpg" : user.image}
                                alt="profile-image"
                                className="rounded-circle me-2"
                                style={{ maxWidth: "40px" }}
                            />
                            <h6>{user.username}</h6>
                        </div>
                        <div className="col-md-6 col-sm-12 d-flex justify-content-end">
                            <Link className="text-decoration-none" onClick={onClose} to={`/profile/${user._id}`}>
                                <h6 className="mb-0">Profile</h6>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
};
export default UserList;
