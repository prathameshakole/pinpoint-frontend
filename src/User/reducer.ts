import { createSlice } from "@reduxjs/toolkit";

export interface User {
    _id: string, username: string; password: string; role: string;
    firstName: string, lastName: string, email: string, following: {
      type: string[],
      unique: true
    }
};
const initialState: {
  user: User;
} = {
  user: { username: "", password: "", firstName: "", lastName: "", role: "USER", _id: "", email: "", following: {type: [],
    unique: true,}},
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
