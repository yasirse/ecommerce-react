/**
 * ErrorPage component — displays a simple error message view.
 * No props; side-effects: resets current UI tab via store action.
 */
import React from "react";
import { changeTab } from "../store/tabSlice";
import { useDispatch } from "react-redux";

const ErrorPage = () => {
  const dispatch = useDispatch();
  dispatch(changeTab(""));
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h4>This content isn't available at the moment</h4>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};
export default ErrorPage;
