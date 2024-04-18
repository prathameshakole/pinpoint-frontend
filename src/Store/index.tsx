import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../User/reducer"
import postsReducer from "../Home/reducer"

export interface KanbasState {
  userReducer: {
    user: any;
  };
  postsReducer: {
    posts: any[];
    post: any;
  };
}
const store = configureStore({
  reducer: {
    userReducer,
    postsReducer,
  }
});
export default store;