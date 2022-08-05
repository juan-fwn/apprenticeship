import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: null,
};

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setImages(state, action) {
      state.images = action.payload;
    },
  },
});

export const configurationActions = configurationSlice.actions;

export default configurationSlice;
