import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllUsers } from "../User/client";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const ads = useSelector((state: any) => state.adReducer.ads);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await findAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      {users.map((u: any) => (
        <div key={u._id} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-3 h-100">
              <img
                src={u.image === undefined || u.image === '' ? "/default.jpg" : u.image}
                alt="profile-image"
                className="img-fluid rounded-start"
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }} />
            </div>
            <div className="col-md-9">
              <div className="card-body ms-4 mt-3">
                <h5 className="card-title">{u.firstName} {u.lastName}</h5>
                <p className="card-text">
                  <span className="fw-bold">Username:</span> @{u.username}
                </p>
                <p className="card-text">
                  <span className="fw-bold">Role:</span> {u.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;