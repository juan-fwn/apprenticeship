import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageSettings: {},
};

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setImageSettings(state, action) {
      state.imageSettings = action.payload;
    },
  },
});

export const selectors = {
  getImageSettings: (state) => state.configuration.imageSettings,
};

export const configurationActions = configurationSlice.actions;

export default configurationSlice;
