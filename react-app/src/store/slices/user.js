import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const selectors = {
  getUser: (state) => state.user.user,
};

export const userActions = userSlice.actions;

export default userSlice;
