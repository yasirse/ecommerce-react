/**
 * Redux slice for user authentication and profile state.
 * Exports actions for sign-in/sign-out and tracks loading/error state.
 * State shape: { currentUser, loading, error }.
 */
import { createSlice } from "@reduxjs/toolkit";

//Setting intial values for user slice
const initialState = {
  currentUser:null,
  loading:false,
  error:false,
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    signInStart:(state)=>{
      state.loading = true;
    },
    signInSuccess:(state,action)=>{
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInError:(state,action)=>{
      state.loading=false;
      state.error = action.payload;
    },
    signOut:(state)=>{
      state.currentUser=null;
      state.loading=false;
      state.error = false; 
    }
  }
});
export const {signInStart,signInSuccess,signInError,signOut} = userSlice.actions;
export default userSlice.reducer;