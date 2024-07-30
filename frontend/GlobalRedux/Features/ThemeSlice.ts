// reducers.js
import { createSlice } from '@reduxjs/toolkit';

interface Istate{
  darkMode: boolean;
}

const initialState:Istate = {
  darkMode: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export default themeSlice.reducer;
export const { toggleDarkMode } = themeSlice.actions;
