/**
 * Header (compact) — top navigation including auth links and cart.
 * Uses Redux `user` state and exposes sign-in/out navigation.
 */
import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/userSlice";
import { useState } from "react";
import Cart from "./product/Cart";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(signOut());
    navigate("/sign-in");
  };
  return (
    <nav className="py-2 bg-body-tertiary border-bottom">
      <div className="container flex-wrap d-flex">
        
        <ul className="nav me-auto">
          <li className="nav-item">
         
            <a
              href="#"
              className="nav-link link-body-emphasis px-2 active w-30"
              aria-current="page"
            >
              <img
                src="//rollover.com.pk/cdn/shop/files/Rollover_logo.png?v=1631512196&amp;width=175"
                alt="Rollover Kids Company"
              />
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className="nav-link link-body-emphasis px-2 active"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link link-body-emphasis px-2">
              Girls
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link link-body-emphasis px-2">
              Boys
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link link-body-emphasis px-2">
              Ladies
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link link-body-emphasis px-2">
              Baby
            </a>
          </li>
        </ul>
        <ul className="nav">
          {currentUser === null ? (
            <>
              <li className="nav-item">
                <Link
                  to="/sign-in"
                  className="nav-link link-body-emphasis px-2"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/sign-up"
                  className="nav-link link-body-emphasis px-2"
                >
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <div className="flex-shrink-0 dropdown">
                  <a
                    href="#"
                    className="d-block link-body-emphasis text-decoration-none dropdown-toggle nav-link link-body-emphasis px-2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaCircleUser size="25px" />
                    <span style={{ padding: "0px 5px 0px 10px" }}>
                      {currentUser.name}
                    </span>
                  </a>
                  <ul className="dropdown-menu text-small shadow">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        href="#"
                        className="dropdown-item"
                        onClick={(e) => handleSignOut(e)}
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          )}
          <li className="nav-item dropdown">
            <Cart />
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Header;
