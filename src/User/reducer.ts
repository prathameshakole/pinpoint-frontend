import { createSlice } from "@reduxjs/toolkit";

export interface User {
  _id: string, username: string; password: string; role: string;
  firstName: string, lastName: string, email: string, image: string, bio: string, following: [], follower: []
};
const initialState: {
  user: User;
} = {
  user: {
    username: "", password: "", bio: "", firstName: "", lastName: "", role: "USER", _id: "", email: "", image: "", following: [], follower: []
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    }
  },
});

export const { setUser, resetUser } =
  userSlice.actions;
export default userSlice.reducer;
