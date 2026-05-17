import { createSlice } from "@reduxjs/toolkit";

/**
 * NOTE: redux slice for managing authenticated user state
 * handles the persistence of user metadata across the application lifecycle
 */
const userSlice = createSlice({
  name: "user",
  initialState: null, // default state is null, representing an unauthenticated session
  reducers: {
    // updates the state with the authenticated user's metadata (uid, email, displayName)
    addUser: (state, action) => {
      return action.payload;
    },
    // resets the state to null upon user sign-out
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
