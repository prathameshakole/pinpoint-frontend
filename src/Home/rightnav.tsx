import { useSelector } from "react-redux";
import AdCard from "../Ads/adcomponent";
import { useState, useEffect } from "react";
import * as adClient from "../Ads/client";
import * as userClient from "../User/client";
import UserList from "../User/userList";
import { setUser } from "../User/reducer";

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
  const [users, setUsers] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const f = await userClient.findUsers(user.following);
      setUsers(f);
    };
    fetchUsers();
    // const fetchSuggestedUsers = async () => {
    //   const suggestedUsers = await userClient.fetchSuggestedUsers();
    //   setSuggestedUsers(suggestedUsers);
    // };
    // fetchSuggestedUsers();
    const getRandomAd = async () => {
      const ad = await adClient.getRandomAd();
      setAd(ad);
    };
    getRandomAd();
  }, []);
  return (
    <div>
      {user._id !== "" && (
        <div>
          <h5 className="p-4 pb-0">Suggested</h5>
            <div className="container p-4">
              <UserList users={users} />
            </div>
        </div>
      )}
      <h5 className="p-4 pb-0">Ad</h5>
      <AdCard ad={ad} editable={false} approvable={false} />
    </div>
  );
};
export default RightNav;
