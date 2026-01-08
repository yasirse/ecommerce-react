/**
 * Redux slice for tab navigation state management.
 * Tracks the currently selected tab and provides actions to switch between tabs.
 * State shape: { selectedTab: string }.
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTab:"manage-products",
}
const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers:{
    changeTab:(state,action)=>{
      state.selectedTab = action.payload;
    }
  }
});
export const {changeTab} = tabSlice.actions;
export default tabSlice.reducer;