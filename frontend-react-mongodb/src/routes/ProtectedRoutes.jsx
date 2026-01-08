/**
 * Protected routes component for authenticated users.
 * Checks if user is logged in via Redux state.
 * Renders child routes if authenticated, otherwise redirects to sign-in page.
 * @component
 * @returns {JSX.Element} Outlet for nested routes or Navigate to sign-in
 */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="sign-in" />;
};

export default ProtectedRoutes;
