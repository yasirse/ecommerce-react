/**
 * Sidebar — enhanced sidebar with collapsible behavior and navigation links.
 * Props: none; reads `tab` and `user` from Redux and dispatches actions.
 */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// Icon imports
import { IoHomeOutline } from "react-icons/io5";
import { LuCombine } from "react-icons/lu";
import { changeTab } from "../store/tabSlice";
import { FaArrowRight, FaArrowLeft, FaStreetView } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { FaFirstOrderAlt, FaRegUser } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdBorderColor } from "react-icons/md";
import { HiReceiptRefund } from "react-icons/hi2";

const Sidebar = () => {
  // Local state for toggling sidebar width/visibility
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  
  // Navigation and Redux hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract global state from Redux store
  const { selectedTab } = useSelector((state) => state.tab);
  const { currentUser } = useSelector((state) => state.user);

  // Toggle sidebar collapse state
  const closeSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Handle navigation to product management with auth check
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/sign-in");
    } else {
      dispatch(changeTab("manage-products"));
      navigate("/manage-products");
    }
  };

  // Handle Home navigation and update active tab state
  const handleHome = (e) => {
    e.preventDefault();
    dispatch(changeTab("home"));
    navigate("/");
  };

  return (
    <div 
      className={`w-75 sidebar-md mt-5 sidebar border ${!isSidebarVisible && "sidebar-hidden"}`}
      style={{ borderRadius: "5px", backgroundColor: "#e9ecef" }}
    >
      <div id="sidebar" className="d-flex flex-column mx-2">
        
        {/* Collapse/Expand Toggle Button */}
        <button type="button" className="btn px-2 ms-auto" onClick={closeSidebar}>
          {isSidebarVisible ? <FaArrowLeft style={{ fontSize: "16px", color: "#000" }} /> : <FaArrowRight style={{ fontSize: "16px", color: "#000" }} />}
        </button>
        
        <ul className="nav nav-pills flex-column mb-auto">
          {/* Home Link */}
          <li className={`nav-item ${isSidebarVisible ? "" : "text-end"}`}>
            <Link
              to="/"
              className={`nav-link ms-auto ${selectedTab === "home" && "active"}`}
              onClick={handleHome}
            >
              <IoHomeOutline style={{ width: "16px", height: "16px", margin: "0px 5px 5px 0px" }} />
              {isSidebarVisible && "Home"} 
              {!isSidebarVisible && <IoHomeOutline style={{ width: "16px", height: "16px" }} />}
            </Link>
          </li>

          {/* Manage Products Link */}
          <li className={`nav-item ${isSidebarVisible ? "" : "text-end"}`}>
            <Link
              to="#"
              className={`nav-link ms-auto ${selectedTab === "manage-products" && "active"}`}
              onClick={handleAddProduct}
            >
              <LuCombine style={{ width: "16px", height: "16px", margin: "0px 5px 5px 0px" }} />
              {isSidebarVisible && "Manage Products"}
              {!isSidebarVisible && <LuCombine style={{ width: "16px", height: "16px" }} />}
            </Link>
          </li>

          {/* Product Sales Link */}
          <li className={`nav-item ${isSidebarVisible ? "" : "text-end"}`}>
            <Link
              to="#"
              className={`nav-link ms-auto ${selectedTab === "sales" && "active"}`}
              onClick={handleAddProduct}
            >
              <FcSalesPerformance style={{ width: "16px", height: "16px", margin: "0px 5px 5px 0px" }} />
              {isSidebarVisible && "Product Sales"}
              {!isSidebarVisible && <FcSalesPerformance style={{ width: "16px", height: "16px" }} />}
            </Link>
          </li>
       
          {/* Additional menu items follow similar logic: 
              - Use Redux state for 'active' class
              - Conditionally show text/icons based on isSidebarVisible 
          */}
          <li className={`nav-item ${isSidebarVisible ? "" : "text-end"}`}>
            <Link to="#" className={`nav-link ms-auto ${selectedTab === "productviews" && "active"}`} onClick={handleAddProduct}>
              <FaStreetView style={{ width: "16px", height: "16px", margin: "0px 5px 5px 0px" }} />
              {isSidebarVisible && "Product views"}
              {!isSidebarVisible && <FaStreetView style={{ width: "16px", height: "16px" }} />}
            </Link>
          </li>

          <li className={`nav-item ${isSidebarVisible ? "" : "text-end"}`}>
            <Link to="#" className={`nav-link ms-auto ${selectedTab === "productrevenue" && "active"}`} onClick={handleAddProduct}>
              <RiMoneyDollarCircleFill style={{ width: "16px", height: "16px", margin: "0px 5px 5px 0px" }} />
              {isSidebarVisible && "Product Revenue"}
              {!isSidebarVisible && <FaFirstOrderAlt style={{ width: "16px", height: "16px" }} />}
            </Link>
          </li>

          <li className={`nav-item ${isSidebarVisible ? "" : "text-end"}`}>
            <Link to="#" className={`nav-link ms-auto ${selectedTab === "customersist" && "active"}`} onClick={handleAddProduct}>
              <FaRegUser style={{ width: "16px", height: "16px", margin: "0px 5px 5px 0px" }} />
              {isSidebarVisible && "Customers"}
              {!isSidebarVisible && <FaRegUser />}
            </Link>
          </li>

          <li className={`nav-item ${isSidebarVisible ? "" : "text-end"}`}>
            <Link to="#" className={`nav-link ms-auto ${selectedTab === "productrevenue" && "active"}`} onClick={handleAddProduct}>
              <FaRegUser style={{ width: "16px", height: "16px", margin: "0px 5px 5px 0px" }} />
              {isSidebarVisible && "Customer Detail"}
              {!isSidebarVisible && <FaRegUser style={{ width: "16px", height: "16px" }} />}
            </Link>
          </li>

          <li className={`nav-item ${isSidebarVisible ? "" : "text-end"}`}>
            <Link to="#" className={`nav-link ms-auto ${selectedTab === "productrevenue" && "active"}`} onClick={handleAddProduct}>
              <MdBorderColor style={{ width: "16px", height: "16px", margin: "0px 5px 5px 0px" }} />
              {isSidebarVisible && "Orders"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
