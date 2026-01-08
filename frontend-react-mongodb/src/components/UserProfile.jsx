/**
 * UserProfile — displays current user's name and email from Redux store.
 * No props; reads `currentUser` and dispatches tab reset.
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../store/tabSlice";

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  dispatch(changeTab(""));
  return (
    <div className="container-div mx-5 my-5">
      <h4>Profile</h4>
      <div className="mb-2">
        <label className="form-label">Name: </label>
        <label className="form-label fw-bold">{currentUser.name}</label>
      </div>
      <div className="mb-2">
        <label className="form-label">Email: </label>
        <label className="form-label fw-bold">{currentUser.email}</label>
      </div>
    </div>
  );
};

export default UserProfile;
