/**
 * PlaceOrder — checkout form that submits an order for cart items.
 * Reads cart and user token from Redux and calls the place-order API.
 */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";

const PlaceOrder = () => {
  const authtoken = useSelector((state) => state.user.currentUser.token);
  const { products } = useSelector((state) => state.cart);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMsg] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/product/placeorder",
        {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            phone: phone,
            address: address,
            products: products,
          }),
          method: "POST",
        }
      );

      if (response.ok) {
        dispatch(clearCart());
        const result = await response.json();
        console.log("Product uploaded successfully", result);
        setName("");
        setAddress("");
        setPhone(0);
        setAlertMsg("Order Placed Successfully");
        setSuccessMsg("Order Placed Successfully");
        setErrorMsg("");
        setAlert(true);
        setAddProduct(false);
      } else {
        let result1 = await response.json();
      }
    } catch (error) {
      console.error("Error uploading product", error);
      setErrorMsg("Place Order Failed");
    }
  };

  return (
    <div className="container container-div">
      {alert && <div className="alert alert-success">{alertMessage}</div>}
      <form method="POST" className="create-post" onSubmit={handleSubmit}>
        <h4>Place Order</h4>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Customer Name:
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Customer Name..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Phone No:
          </label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Enter Your Phone No."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Postal Address:
          </label>
          <textarea
            type="text"
            rows="4"
            className="form-control"
            id="productDescription"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your postal address for shipment"
          />
        </div>

        <button
          type="submit"
          className="px-4 btn btn-primary"
          style={{ marginRight: "5px" }}
        >
          Buy
        </button>
        <button type="submit" className="px-4 btn btn-primary">
          Cancel
        </button>
        <p className="text-danger">{errorMsg}</p>
        <p className="text-success">{successMsg}</p>
      </form>
    </div>
  );
};

export default PlaceOrder;
