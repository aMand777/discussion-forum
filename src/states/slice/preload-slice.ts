import { createSlice } from '@reduxjs/toolkit';

const preloadSlice = createSlice({
  name: 'preload',
  initialState: { isPreload: false },
  reducers: {
    setPreload(state) {
      state.isPreload = true
    },
    unSetPreload(state) {
      state.isPreload = false;
    },
  },
});

export const { setPreload, unSetPreload } = preloadSlice.actions;

export default preloadSlice.reducer;
