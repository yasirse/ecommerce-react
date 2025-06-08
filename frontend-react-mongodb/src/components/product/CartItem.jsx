import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
const apiKey = import.meta.env.VITE_APP_API_URL;

const CartItem = ({itemid, item, onUpdate, onRemove }) => {
const [quantity, setQuantity] = useState(item.orderedQuantity);

  useEffect(() => {
    if (quantity !== item.orderedQuantity) {
      setQuantity(item.orderedQuantity);
    }
  }, [item.orderedQuantity]);

  const handleUpdate = () => {
    onUpdate(item.id, quantity);
  };
  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= item.totalQuantity) {
      setQuantity(value);
    } else if (value > item.totalQuantity) {
      setQuantity(item.totalQuantity);
    } else if (value < 1) {
      setQuantity(1);
    }
  };

  return (
    <li key={itemid}>               { /*flex-column flex-sm-row*/}
    <div className="cart-item d-flex  flex-column flex-sm-row justify-content-between align-items-center mb-3 mx-sm-2">
    <div className="d-flex flex-row ">
          <img
            src={`${apiKey}/uploads/${item.picture}`}
            alt={item.name}
            className="cart-item-image " 
            style={{marginLeft:"13px", width: "60px", height: "60px", objectFit: "cover" }}
          />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-price">
              Rs. {quantity}x{item.price}
            </div>
          </div>
      </div>
      <div className="cart-item-quantity d-flex flex-row align-items-center">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={item.totalQuantity}
                  style={{ width: "60px" }}
                />
                <button
                  className="btn btn-outline-primary btn-sm ml-2"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <RiDeleteBin6Line
                style={{
                  width: "20px",
                  height: "20px",
                  color: "red",
                  marginLeft: "10px",
                }}
                onClick={() => onRemove(item.id)}
              />
           </div>     
      
    </div>
    </li>
  );
};

export default CartItem;
