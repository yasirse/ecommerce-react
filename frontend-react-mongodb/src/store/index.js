/**
 * Redux store configuration with persistence.
 * Combines reducers for user, cart, and tab state management.
 * Uses redux-persist to maintain state across browser sessions.
 */
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import tabReducer from "./tabSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({user:userReducer,tab:tabReducer,cart:cartReducer});
const persistConfig = {
  key:'root',
  version:1,
  storage,
}
const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
  reducer:
    persistedReducer
  ,
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
    serializableCheck:false,
  }),
});
export const persistor = persistStore(store);