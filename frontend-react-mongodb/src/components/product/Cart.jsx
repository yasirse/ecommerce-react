import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, updateProductQuantity } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "./product.css";
const stripeKey = import.meta.env.VITE_STRIPE_KEY;
const apiKey = import.meta.env.VITE_APP_API_URL;

const Cart = ({ isNavCollapsed, setIsNavCollapsed }) => {
  const handleNavLinkClick = () => {
    setIsNavCollapsed(true); // Close the navbar
  };
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cart);
  const [totalItems, setTotalItems] = useState();

  useEffect(() => {
    setTotalItems(calculateTotalItems(products));
  }, [products]);

  const dispatch = useDispatch();

  const handleUpdate = (itemId, newQuantity) => {
    console.log("update item Id",itemId);
    dispatch(updateProductQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeProduct({ id: itemId }));
  };
  const handleOrder = () => {
    navigate("/placeorder");
  };
  const handleStripe = async () => {
    console.log(products);
    const stripe = await loadStripe(stripeKey);
    const body = {
      products: products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `${apiKey}/api/product/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();

    const result = stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.log(result.error);
    } else console.log("Result here:", result);
  };
  const calculateTotalBill = (products) => {
    return products.reduce((total, product) => {
      return total + product.price * product.orderedQuantity;
    }, 0);
  };
  const calculateTotalItems = (products) => {
    return products.reduce((total, product) => {
      return total + product.orderedQuantity;
    }, 0);
  };
  //setBill(calculateTotalBill(products));
  return (
    <>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="cartDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="true"
        onClick={handleNavLinkClick}
      >
<div className="cart-icon-container">
    <BsCart3 size={23} />
    {products.length > 0 && (
      <span className="cart-badge">{totalItems}</span>
    )}
  </div>
      </a>
      {/* xxscreen is custom css defined in cart.css */}
      <ul className="dropdown-menu dropdown-menu-end xxcart" style={{maxHeight: "80vh", overflowY:"auto"  }} aria-labelledby="cartDropdown"  onClick={(e) => e.stopPropagation()}>
      <h6 className="w-100  border rounded d-flex justify-content-center bg-custom-danger py-2 pb-2">My Cart Items</h6>
            {products.length > 0 ? (
            products.map((item) => (
              <CartItem
                itemid={item._id}
                item={item}
                onUpdate={handleUpdate}
                onRemove={handleRemove}
              />
            ))
          ) : (
           <li className="d-flex justify-content-center align-items-center mx-4"><p>You're just Rs.5000 away from FREE SHIPPING! Add more items to your cart and save on delivery!</p></li> 

          )}
       
        <div className="d-grid">
          {products.length > 0 && (
            <>
             <hr />
             <div className="d-flex justify-content-end px-3">
               <strong className="mx-3">Total: </strong>
               Rs.{calculateTotalBill(products)}
             </div>
            <button
              type="button"
              className="btn btn-primary btn-sm mx-4 my-1"
              onClick={handleOrder}
            >
              Place Order
            </button>
            </>
          )}
        </div>
        <div className="d-grid">
          {products.length > 0 && (
            <button
              type="button"
              className="btn btn-primary btn-sm mx-4 my-1"
              onClick={handleStripe}
            >
              Test Stripe
            </button>
          )}
        </div>
      </ul>
    </>
  );
};

export default Cart;
