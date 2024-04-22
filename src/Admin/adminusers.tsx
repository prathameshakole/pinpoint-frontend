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
        <div className="m-2">
            {userList.map((u: any) => (
                <div key={u._id} className="card m-2">
                    <div className="row m-2">
                        <div className="col-3">
                            <div className="ratio ratio-1x1">
                                <img
                                    src={u.image === undefined || u.image === '' ? "/default.jpg" : u.image}
                                    alt="profile"
                                    className="rounded-circle m-4"
                                    style={{
                                        height: '70%',
                                        width: '70%',
                                        objectFit: 'cover',
                                    }} />
                            </div>

                        </div>
                        <div className="col-5">
                            <div className="card-body">
                                <h5 className="card-title">{u.firstName} {u.lastName}</h5>
                                <p className="card-text">
                                    <span className="fw-bold">Username:</span> @{u.username}
                                </p>
                            </div>
                        </div>
                        <div className="col-4 form-group">
                            <div>
                                <label htmlFor="role"><h6>Role</h6></label>
                                <select
                                    className="form-control mb-2"
                                    id="role"
                                    name="role"
                                    value={u.role}
                                    onChange={(e) => handleChange(e, u.id)}
                                >
                                    <option value="USER">USER</option>
                                    {user.role === 'ADMIN' && <option value="ADMIN">ADMIN</option>}
                                    <option value="ADVERTISER">ADVERTISER</option>
                                </select>
                                <button type="submit" onClick={() => handleSubmit(u)} className="btn btn-primary w-100">
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
