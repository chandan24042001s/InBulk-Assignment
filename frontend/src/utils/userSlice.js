import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState:{
    User:null,
  },
  reducers: {
    addUser: (state, action) => {
      state.User= action.payload;
    },
    removeUser: (state, action) => {
      state.User=null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;