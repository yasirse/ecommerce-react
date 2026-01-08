/**
 * Protected routes component for authentication pages (sign-in, sign-up, forgot-password).
 * Prevents logged-in users from accessing authentication pages.
 * Redirects authenticated users to home page, allows non-authenticated to access auth routes.
 * @component
 * @returns {JSX.Element} Outlet for nested auth routes or Navigate to home
 */
import { current } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRouteSign = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRouteSign;
