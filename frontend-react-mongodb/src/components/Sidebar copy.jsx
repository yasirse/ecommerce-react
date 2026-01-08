/**
 * Sidebar (simple) — vertical navigation for main app pages.
 * Uses Redux `tab` and `user` state to control navigation and auth flows.
 */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineAddBox } from "react-icons/md";
import { changeTab } from "../store/tabSlice";
import { LuCombine } from "react-icons/lu";

const Sidebar = () => {
  const navigate = useNavigate();
  const { selectedTab } = useSelector((state) => state.tab);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //console.log("Tab value", selectedTab);
  const handleAddProduct = (e) => {
    e.preventDefault();
    //console.log("Add Product Clicked");
    if (currentUser === null) {
      navigate("/sign-in");
    } else {
      //console.log("in dispatch");
      dispatch(changeTab("manage-products"));
      navigate("/manage-products");
    }
  };
  const handleHome = (e) => {
    e.preventDefault();
    //console.log("Home Clicked");
    dispatch(changeTab("home"));
    navigate("/");
  };
  return (
    <div
      className="d-flex flex-column my-5 mx-2"
      style={{ minHeight: "400px" }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a
            href="#"
            className={`nav-link ${selectedTab === "home" && "active"}`}
            aria-current="page"
            onClick={(e) => handleHome(e)}
          >
            <IoHomeOutline
              className="me-2"
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 0px 5px 0px",
              }}
            />
            Home
          </a>
        </li>

        <li className="nav-item">
          <a
            href="#"
            className={`nav-link ${
              selectedTab === "manage-products" && "active"
            }`}
            onClick={(e) => handleAddProduct(e)}
          >
            <LuCombine
              className="me-2"
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 0px 5px 0px",
              }}
            />
            Manage Products
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
