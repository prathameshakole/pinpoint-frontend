import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../User/reducer"
import postsReducer from "../Home/reducer"
import adReducer from "../Ads/reducer"

export interface KanbasState {
  userReducer: {
    user: any;
  };
  postsReducer: {
    posts: any[];
    post: any;
  };
  adReducer : {
    ads :any[];
    ad :any;
  }
}
const store = configureStore({
  reducer: {
    userReducer,
    postsReducer,
    adReducer,
  }
});
export default store;