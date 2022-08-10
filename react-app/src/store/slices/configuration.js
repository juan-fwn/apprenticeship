import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setImagesConfiguration(state, action) {
      state.images = action.payload;
    },
    setGenresList(state, action) {
      state.genres = action.payload;
    },
  },
});

export const configurationActions = configurationSlice.actions;

export default configurationSlice;
