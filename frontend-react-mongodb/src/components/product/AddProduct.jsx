/**
 * AddProduct — form to add a new product to the catalog (admin feature).
 * Uses local state and posts product data to backend API.
 */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManageProducts from "./ManageProducts";
const apiKey = import.meta.env.VITE_APP_API_URL;
const AddProduct = () => {
  const authtoken = useSelector((state) => state.user.currentUser.token);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pictureMsg, setPictureMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMsg] = useState("");
  const [picture, setPicture] = useState(null);
  const [filename, setFilename] = useState("");
  const [showAddProduct, setAddProduct] = useState(false);

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [alert]);

  const handleFileChange = (event) => {
    setPicture(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      formData.append("file", picture);
      console.log(formData.get("file"));
      console.log(authtoken);
      const response = await fetch(
        `${apiKey}/api/product/add-product`,
        {
          headers: {
            "auth-token": authtoken,
          },
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Product uploaded successfully", result);
        setProductName("");
        setDescription("");
        setPrice(0);
        setQuantity(0);
        setPicture(null);
        setFilename("");
        setAlertMsg("Success: Product added !!");
        setSuccessMsg("Success: Product added");
        setErrorMsg("");
        setAlert(true);
        setAddProduct(false);
      } else {
        let result1 = await response.json();
        setErrorMsg("Product upload failed");
        setPictureMsg(result1.message);
      }
    } catch (error) {
      console.error("Error uploading product", error);
      setErrorMsg("Error uploading product");
    }
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-end mt-4">
        {showAddProduct && (
          <button
            type="button"
            className="px-2 py-1 btn btn-primary mx-4"
            onClick={() => {
              setAddProduct(false);
            }}
          >
            Products List
          </button>
        )}
        {!showAddProduct && (
          <button
            type="button"
            className="px-2 py-1 btn btn-primary mx-4"
            onClick={() => {
              setAddProduct(true);
              setSuccessMsg("");
            }}
          >
            Add Product
          </button>
        )}
      </div>

      {showAddProduct && (
        <div className="container container-div">
          {alert && <div className="alert alert-success">{alertMessage}</div>}
          <form method="POST" className="create-post" onSubmit={handleSubmit}>
            <h4>Add Product</h4>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name:
              </label>
              <input
                type="text"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                placeholder="Product Name..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                Product Price:
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text">Rs.</span>
                <span className="input-group-text">0.00</span>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  aria-label="Dollar amount (with dot and two decimal places)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                Product Quantity:
              </label>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">
                Product Description:
              </label>
              <textarea
                type="text"
                rows="4"
                className="form-control"
                id="productDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us more about it."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Upload Product Picture here:
              </label>
              <input
                type="file"
                className="form-control"
                id="formFile"
                onChange={handleFileChange}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {filename}
                {pictureMsg !== "" ? (
                  <p className="text-danger">{pictureMsg}</p>
                ) : (
                  ""
                )}
              </label>
            </div>
            <button type="submit" className="px-4 btn btn-primary">
              Add
            </button>
            <p className="text-danger">{errorMsg}</p>
            <p className="text-success">{successMsg}</p>
          </form>
        </div>
      )}
      {!showAddProduct && <ManageProducts />}
    </>
  );
};
export default AddProduct;
