import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllUsers } from "../User/client";
import * as client from '../User/client';
import * as userReducer from '../User/reducer'
const AdminUsers = () => {
    const dispatch = useDispatch();
    const [userList, setUserList] = useState<any[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await findAllUsers();
                setUserList(fetchedUsers);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUsers();
    }, []);
    const user = useSelector((state: any) => state.userReducer.user);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>, userId: any) => {
        setUserList((userList) => userList.map((user) => user.id === userId ? { ...user, [e.target.name]: e.target.value } : user
        )
        );
    };

    const handleSubmit = async (currentUser: any) => {
        try {
            const updatedUser = await client.updateUser({ ...currentUser, });
            dispatch(userReducer.setUser(updatedUser));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };




    return (
        <div className="container">
            {userList.map((u: any) => (
                <div key={u._id} className="card mb-3">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="ratio ratio-1x1">
                                <img
                                    src={u.image === undefined || u.image === '' ? "/default.jpg" : u.image}
                                    alt="profile"
                                    className="rounded-circle ms-5 mt-4 mb-4"
                                    style={{
                                        height: '70%',
                                        width: '70%',
                                        objectFit: 'cover',
                                    }} />
                            </div>

                        </div>
                        <div className="col-md-5">
                            <div className="card-body ms-4 mt-3">
                                <h5 className="card-title">{u.firstName} {u.lastName}</h5>
                                <p className="card-text">
                                    <span className="fw-bold">Username:</span> @{u.username}
                                </p>
                            </div>
                        </div>
                        <div className=" col-md-4 form-group ">
                            <div className="mt-4 ms-4 mb-4">
                                <label htmlFor="role" className="mt-1"><h6>Role</h6></label>
                                <select
                                    className="form-control mb-1"
                                    style={{ width: '65%' }}
                                    id="role"
                                    name="role"
                                    value={u.role}
                                    onChange={(e) => handleChange(e, u.id)}
                                >
                                    <option value="USER">USER</option>
                                    {user.role === 'ADMIN' && <option value="ADMIN">ADMIN</option>}
                                    <option value="ADVERTISER">ADVERTISER</option>
                                </select>
                                <button type="submit" style={{ width: '65%' }} onClick={() => handleSubmit(u)} className="btn btn-primary mt-1">
                                    Update
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminUsers;