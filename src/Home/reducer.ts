import { createSlice } from "@reduxjs/toolkit";
import { User } from "../User/reducer";

export interface Post {
  userid: string, image: string,
  options: {
    1: string, 2: string, 3: string, 4: string,
  },
  date: Date,
  reactions: []
  votes?: { [key: string]: number },
  user?: User
};

const initialState: {
  trendingPosts: any[];
  followingPosts: any[];
  post: Post
} = {
  trendingPosts: [],
  followingPosts: [],
  post: {
    userid: "", image: "",
    options: {
      1: "", 2: "", 3: "", 4: "",
    },
    date: new Date,
    reactions: [],
    votes: {},
    user: {
      username: "", password: "", bio: "", firstName: "", lastName: "", role: "USER", _id: "", email: "", image: "", following: [], follower: []
    }
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.trendingPosts = [
        { ...action.payload },
        ...state.trendingPosts,
      ];
    },
    deletePost: (state, action) => {
      state.trendingPosts = state.trendingPosts.filter(
        (post) => post._id !== action.payload,
      );
    },
    updatePost: (state, action) => {
      state.trendingPosts = state.trendingPosts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setPosts: (state, action: any) => {
      state.trendingPosts = action.payload;
    },
    setFollowingPosts: (state, action: any) => {
      state.followingPosts = action.payload;
    },
  },
});

export const { addPost, deletePost, updatePost, setPost, setPosts, setFollowingPosts } =
  postsSlice.actions;
export default postsSlice.reducer;
