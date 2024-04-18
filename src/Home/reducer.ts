import { createSlice } from "@reduxjs/toolkit";
import { Buffer } from "buffer";

const initialState: {
  posts: any[];
  post: {
    userid: string, image: string,
    options: {
      1: string, 2: string, 3: string, 4: string,
    },
    date: string,
    reactions: [{
      userid: string, reaction: string
    }]
  };
} = {
  posts: [],
  post: {
    userid: "", image: "",
    options: {
      1: "", 2: "", 3: "", 4: "",
    },
    date: "",
    reactions: [{userid: "", reaction: ""}]
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: any) => {
      state.posts = [
        { ...action.payload },
        ...state.posts,
      ];
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload,
      );
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) => {
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
      state.posts = action.payload;
    },
  },
});

export const { addPost, deletePost, updatePost, setPost, setPosts } =
  postsSlice.actions;
export default postsSlice.reducer;
