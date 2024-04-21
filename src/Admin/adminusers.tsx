import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdCard from "../Ads/adcomponent";
import { setAds } from "../Ads/reducer";
import * as client from "../Ads/client";
import { findAllUsers } from "../User/client";
import { setUser } from "../User/reducer";

const AdminUsers = () => {
  const dispatch = useDispatch();
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
    <div className="m-4">
      {users.map((u: any) => (
        <div key={u._id} className="card mb-3 w-75">
        <div className="row g-0 shadow-lg">
          <div className="col-md-3">
            <img
              src={u.image === undefined || u.image === '' ? "/default.jpg" : u.image}
              alt="profile-image"
              className="img-fluid rounded-start"
            />
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
              {/* Add more user details as needed */}
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default AdminUsers;