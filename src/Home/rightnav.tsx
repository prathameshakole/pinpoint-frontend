import { useSelector } from "react-redux";
import AdCard from "../Ads/adcomponent";
import { useState, useEffect } from "react";
import * as adClient from "../Ads/client";
import * as userClient from "../User/client";
import UserList from "../User/userList";

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
    url: "",
  });
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      const suggestedUsers = await userClient.fetchSuggestedUsers(user._id);
      setSuggestedUsers(suggestedUsers);
    };

    fetchSuggestedUsers();

    const getRandomAd = async () => {
      const ad = await adClient.getRandomAd();
      setAd(ad);
    };

    getRandomAd();
  }, [user]);

  return (
    <div className="d-none d-lg-block col-lg-3 p-4 position-fixed card" style={{ top: 0, right: 0, height: '100vh', overflowY: 'auto' }}>
      <div>
        {user._id !== '' && user._id !== undefined && (
          <div className="card my-4">
            <div className="d-flex align-items-center p-2">
              <img
                className="me-2 rounded-circle"
                src={user.image === undefined || user.image === '' ? "/default.jpg" : user.image}
                alt="profile-image"
                style={{ width: "60px", height: "60px", objectFit: 'cover' }}
              />
              <div>
                <h5 className="mb-0">{'@' + user.username}</h5>
                <p className="mb-0 text-muted">{user.firstName + " " + user.lastName}</p>
              </div>
            </div>
          </div>
        )}

        {user._id !== "" && suggestedUsers.length > 0 && (
          <div>
            <h5 className="p-4 pb-0">Suggested Users</h5>
            <div className="container p-4">
              <UserList users={suggestedUsers} />
            </div>
          </div>
        )}

        {ad.approved === true && (
          <>
            <h5 className="p-4 pb-0">Ad</h5>
            <AdCard ad={ad} editable={false} approvable={false} />
          </>
        )}
      </div>
    </div>
  );
};

export default RightNav;