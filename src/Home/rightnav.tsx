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
    <div>
      {user._id !== "" && (
        <div>
          <h5 className="p-4 pb-0">Suggested</h5>
          <div className="container p-4">
            <UserList users={suggestedUsers} />
          </div>
        </div>
      )}
      {ad.approved == true &&
        <>
          <h5 className="p-4 pb-0">Ad</h5>
          <AdCard ad={ad} editable={false} approvable={false} />
        </>
      }
    </div>
  );
};
export default RightNav;
