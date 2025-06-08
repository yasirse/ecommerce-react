import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { LuCombine } from "react-icons/lu";
import { changeTab } from "../store/tabSlice";
import { FaArrowRight, FaArrowLeft,FaStreetView } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { FaFirstOrderAlt,FaRegUser } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdBorderColor } from "react-icons/md";
import { HiReceiptRefund } from "react-icons/hi2";


const Sidebar = () => {
   // State to track sidebar visibility
   const [isSidebarVisible, setSidebarVisible] = useState(false);
   // Function to toggle sidebar visibility
   const closeSidebar = () => {
      // Hide sidebar
     if(isSidebarVisible)
     {
      setSidebarVisible(false);
     }
     else
     {
      setSidebarVisible(true);
     }
   }; 
   const openSidebar = () => {
     setSidebarVisible(true); // Show sidebar
     console.log("sidebar open");
   };
  const navigate = useNavigate();
  const { selectedTab } = useSelector((state) => state.tab);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/sign-in");
    } else {
      dispatch(changeTab("manage-products"));
      navigate("/manage-products");
    }
  };

  const handleHome = (e) => {
    e.preventDefault();
    dispatch(changeTab("home"));
    navigate("/");
  };

  return (
    <div className={`w-75 sidebar-md mt-5 sidebar border ${!isSidebarVisible && "sidebar-hidden"}`}
            style={{
              borderRadius: "5px",
              backgroundColor: "#e9ecef",
            }}
          >
    <div id="sidebar" className= "d-flex flex-column mx-2  ">
    
      <button type="button" className="btn px-2 ms-auto  "   onClick={closeSidebar}> {isSidebarVisible ? <FaArrowLeft style={{ fontSize: "16px", color: "#000" }} /> : <FaArrowRight style={{ fontSize: "16px", color: "#000" }} />}</button>
      
      <ul className="nav nav-pills flex-column mb-auto">
        <li className={ ` nav-item ${isSidebarVisible ? "" : "text-end"}`}>
          <Link
            to="/"
            className={`nav-link ms-auto ${selectedTab === "home" && "active"}`}
            aria-current="page"
            onClick={handleHome}
          >
            <IoHomeOutline
              className=""
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />
            Home {!isSidebarVisible ?  <IoHomeOutline
              className=""
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />:""}
          </Link>
        </li>

        <li className={ ` nav-item ${isSidebarVisible ? "" : "text-end"}`}>
          <Link
            to="#"
            className={`nav-link ms-auto  ${
              selectedTab === "manage-products" && "active"
            }`}
            onClick={handleAddProduct}
          >
            <LuCombine
              className=""
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />
            Manage Products
            {!isSidebarVisible ? <LuCombine
              className="mx-0"
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />:""}
          </Link>
        </li>
        <li className={ ` nav-item ${isSidebarVisible ? "" : "text-end"}`}>
          <Link
            to="#"
            className={`nav-link ms-auto  ${
              selectedTab === "sales" && "active"
            }`}
            onClick={handleAddProduct}
          >
            <FcSalesPerformance
              className=""
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />
            Product Sales
            {!isSidebarVisible ? <FcSalesPerformance
              className="mx-0"
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />
            :""}
          </Link>
        </li>
       
        <li className={ ` nav-item ${isSidebarVisible ? "" : "text-end"}`}>
          <Link
            to="#"
            className={`nav-link ms-auto  ${
              selectedTab === "productviews" && "active"
            }`}
            onClick={handleAddProduct}
          >
            <FaStreetView  
              className=""
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />
            Product views
            {!isSidebarVisible ? <FaStreetView  
              className="mx-0"
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 0px 0px 0px",
              }}
            />
            :""}
          </Link>
        </li>
        <li className={ ` nav-item ${isSidebarVisible ? "" : "text-end"}`}>
          <Link
            to="#"
            className={`nav-link ms-auto  ${
              selectedTab === "productrevenue" && "active"
            }`}
            onClick={handleAddProduct}
          >
            <RiMoneyDollarCircleFill
              className=""
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />
            Product Revenue
            {!isSidebarVisible ? <FaFirstOrderAlt 
              className="mx-0"
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 0px 0px",
              }}
            />
            :""}
          </Link>
        </li>
        <li className={ ` nav-item ${isSidebarVisible ? "" : "text-end"}`}>
          <Link
            to="#"
            className={`nav-link ms-auto  ${
              selectedTab === "customersist" && "active"
            }`}
            onClick={handleAddProduct}
          >
            <FaRegUser style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }} />
            
            Customers
            {!isSidebarVisible ? <FaRegUser />
            :""}
          </Link>
        </li>
        <li className={ ` nav-item ${isSidebarVisible ? "" : "text-end"}`}>
          <Link
            to="#"
            className={`nav-link ms-auto  ${
              selectedTab === "productrevenue" && "active"
            }`}
            onClick={handleAddProduct}
          >
            <FaRegUser 
              className=""
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />
            Customer Detail
            {!isSidebarVisible ? <FaRegUser 
              className="mx-0"
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 0px 0px",
              }}
            />
            :""}
          </Link>
        </li>
        <li className={ ` nav-item ${isSidebarVisible ? "" : "text-end"}`}>
          <Link
            to="#"
            className={`nav-link ms-auto  ${
              selectedTab === "productrevenue" && "active"
            }`}
            onClick={handleAddProduct}
          >
            <MdBorderColor  
              className=""
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />
            Orders
            {!isSidebarVisible ? <MdBorderColor  
              className="mx-0"
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 0px 0px",
              }}
            />
            :""}
          </Link>
        </li>
        <li className={ ` nav-item ${isSidebarVisible ? "" : "text-end"}`}>
          <Link
            to="#"
            className={`nav-link ms-auto  ${
              selectedTab === "orderdetail" && "active"
            }`}
            onClick={handleAddProduct}
          >
            <MdBorderColor 
              className=""
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />
            Orders Details
            {!isSidebarVisible ? <MdBorderColor 
              className="mx-0"
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 0px 0px",
              }}
            />
            :""}
          </Link>
        </li>
        <li className={ ` nav-item ${isSidebarVisible ? "" : "text-end"}`}>
          <Link
            to="#"
            className={`nav-link ms-auto  ${
              selectedTab === "refund" && "active"
            }`}
            onClick={handleAddProduct}
          >
            <HiReceiptRefund  
              className=""
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 5px 0px",
              }}
            />
            Refund
            {!isSidebarVisible ? <HiReceiptRefund  
              className="mx-0"
              style={{
                width: "16px",
                height: "16px",
                margin: "0px 5px 0px 0px",
              }}
            />
            :""}
          </Link>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
