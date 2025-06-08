import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/userSlice";
import { useState } from "react";
import Cart from "./product/Cart";
import "./navbar.css";


const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = (e) => {
    e.preventDefault();
    setIsNavCollapsed(!isNavCollapsed);
    dispatch(signOut());
    navigate("/sign-in");
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-light-pink fixed-top  ">
      <div className="container-fluid">
      <a className="navbar-brand" href="#">
              <img
                src="//rollover.com.pk/cdn/shop/files/Rollover_logo.png?v=1631512196&amp;width=175"
                alt="Rollover Kids Company"
              />
      </a>
     <div className="forsmall-screen d-sm-none "><Cart isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}/></div> 
      <button className="navbar-toggler " type="button" data-bs-toggle="collapse" onClick={() => setIsNavCollapsed(!isNavCollapsed)}
      data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
      <ul className="navbar-nav me-auto">
          <li className="nav-item text-sm-center">
            <Link to="/" className="nav-link active" aria-current="page" onClick={() => setIsNavCollapsed(!isNavCollapsed)}  >Home</Link>
          </li>
          <li className="nav-item text-sm-center">
            <a className="nav-link text-sm-center" href="#" onClick={() => setIsNavCollapsed(!isNavCollapsed)}>Cloth</a>
          </li>
          <li className="nav-item text-sm-center">
            <a className="nav-link" href="#">Shoes</a>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          {currentUser === null ? (
            <>
              <li className="nav-item text-sm-center">
                <Link
                  to="/sign-in"
                  className="nav-link link-body-emphasis "
                  onClick={() => setIsNavCollapsed(!isNavCollapsed)}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item text-sm-center">
                <Link
                  to="/sign-up"
                  className="nav-link link-body-emphasis "
                  onClick={() => setIsNavCollapsed(!isNavCollapsed)}
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
                      <Link className="dropdown-item" to="/profile" onClick={() => setIsNavCollapsed(!isNavCollapsed)}>
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
          <li className="nav-item dropdown d-none d-sm-block">
          <Cart />        
          </li>
        </ul>
        
        </div>
      </div>
    </nav>
  );
};
export default Header;
