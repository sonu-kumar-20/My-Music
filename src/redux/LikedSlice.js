import { createSlice } from "@reduxjs/toolkit";

const LikedSlice = createSlice({
  name: "liked",
  initialState: [],
  reducers: {
    AddLiked  : (state, action) => {
      let exists = state.find(song => song.songIndex === action.payload.songIndex);
      if (!exists) {
        state.push(action.payload);
      }
    },
   RemoveLiked : (state, action) => {
      return state.filter(song => song.songIndex !== action.payload.songIndex);
    }
  }
});

export const { AddLiked, RemoveLiked } = LikedSlice.actions;
export default LikedSlice.reducer;
