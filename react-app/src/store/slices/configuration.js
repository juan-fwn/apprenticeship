import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  imageSettings: {},
};

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setImagesSettings(state, action) {
      state.imageSettings = action.payload;
    },
  },
});

export const selectors = {
  getIsLoading: (state) => state.configuration.isLoading,
  getImageSettings: (state) => state.configuration.imageSettings,
};

export const configurationActions = configurationSlice.actions;

export default configurationSlice;
