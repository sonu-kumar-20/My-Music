import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  name: "playlist",
  initialState: [],
  reducers: {
    AddSong: (state, action) => {
      let exists = state.find(song => song.songIndex === action.payload.songIndex);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeSong: (state, action) => {
      return state.filter(song => song.songIndex !== action.payload.songIndex);
    }
  }
});

export const { AddSong, removeSong } = playlistSlice.actions;
export default playlistSlice.reducer;
