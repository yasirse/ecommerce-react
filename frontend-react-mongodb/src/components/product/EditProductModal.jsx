/**
 * EditProductModal — modal form for editing product details.
 * Props: product data, onSave callback.
 */
import React, { useRef, useState } from "react";

const EditProductModal = ({ show, handleClose, product, handleSave }) => {
  console.log("picture received from DB", product.picture);

  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [pictureChanged, setPictureChanged] = useState(false);
  const [productImage, setProductImage] = useState(product.pictureName);
  const [imageSrc, setImageSrc] = useState("");
  console.log("productImage received", productImage);

  const onImageChange = (event) => {
    setProductImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setPictureChanged(true);
  };

  const onSave = () => {
    const updatedProduct = {
      id: product._id,
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      description: productDescription,
      picture: productImage,
      pictureChanged: pictureChanged,
    };
    handleSave(updatedProduct);
    handleClose();
  };

  return (
    <div
      className={`modal ${show ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ backgroundColor: "#e9ecef" }}>
          <div className="modal-header d-flex justify-content-end">
            <h5 className="modal-title">Edit Product</h5>
            {/* <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={handleClose}
            >
              <span aria-hidden="true">&times;</span>
            </button> */}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productQuantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="productQuantity"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productDescription">Description</label>
                <textarea
                  className="form-control"
                  id="productDescription"
                  rows="3"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productImage">Upload Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="productImage"
                  onChange={onImageChange}
                />
              </div>
            </form>
          </div>
          {imageSrc && (
            <img
              className="border border-secondary mx-4"
              src={imageSrc}
              alt="Selected"
              style={{
                width: "15%",
                height: "15%",
              }}
            />
          )}
          {!imageSrc && (
            <img
              className="border border-secondary mx-4"
              src={`http://localhost:3000/uploads/${product.picture}`}
              alt={product.name}
              style={{
                width: "15%",
                height: "15%",
              }}
            />
          )}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onSave}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
