import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import EditProductModal from "./EditProductModal";
import { useSelector } from "react-redux";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const ManageProducts = () => {
  const authtoken = useSelector((state) => state.user.currentUser.token);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMsg] = useState("");
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const handleOpenModal = (product) => {
    console.log("Edit Product", product);
    setEditProduct(product);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditProduct(null);
  };
  const handleSaveProduct = async (updatedProduct) => {
    //console.log("Updated Product=", updatedProduct);
    try {
      const formData = new FormData();
      formData.append("id", updatedProduct.id);
      formData.append("name", updatedProduct.name);
      formData.append("price", updatedProduct.price);
      formData.append("quantity", updatedProduct.quantity);
      formData.append("description", updatedProduct.description);
      //console.log(formData.get("id"));
      if (!updatedProduct.pictureChanged) {
        const response = await fetch(
          `${apiUrl}/api/product/update-product-without-picture`,
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
          console.log("Product uploaded result=", result);
          setAlertMsg("Product Updated Successfully");
          setAlert(true);
        } else {
          console.error("Product upload failed", response.statusText);
        }
      } else {
        formData.append("file", updatedProduct.picture);
        console.log("file in form data", formData.get("file"));
        const response = await fetch(
          `${apiUrl}/api/product/update-product`,
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
          console.log("Product uploaded result=", result);
          setAlertMsg("Product Updated Successfully");
          setAlert(true);
        } else {
          console.error("Product upload failed", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error uploading product", error);
    }
  };
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [alert]);
  const handleDelete = async (id) => {
    try {
      console.log("Id Clicked", id);
      const response = await fetch(
        `${apiUrl}/api/product/deleteProduct`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAlertMsg("Product Deleted Successfuly !");
        setAlert(true);
        console.log("Product deleted successfully", result.message);
      } else {
        console.error("Product delete failed", result.message);
      }
    } catch (error) {
      console.error("Error uploading product", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [alert]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/product/products?page=1&limit=100`
      );
      const result = await response.json();
      console.log("Result of all products", result);
      setProducts(result.records);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <>
      {alert && (
        <div className="alert alert-primary w-50 mx-auto">{alertMessage}</div>
      )}
      <div className="container ">
        <h4 className="mx-2 mr-auto text-success">Product List</h4>
        <table className="table  table-hover">
          <thead>
            <tr>
              <th className="text-primary">Name</th>
              <th className="text-primary">Price</th>
              <th className="text-primary">Quantity</th>
              <th className="text-primary">Description</th>
              <th className="text-primary">Picture</th>
              <th className="text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    {product?.description.split(" ").slice(0, 6).join(" ")}
                  </td>
                  <td>
                    {product.picture && (
                      <img
                        className="border border-secondary"
                        src={`${apiUrl}/uploads/${product.picture}`}
                        alt={product.name}
                        style={{
                          width: "50px",
                          height: "25px",
                        }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    <FaRegEdit
                      style={{ width: "17px", height: "17px", color: "green" }}
                      onClick={() => handleOpenModal(product)}
                    />
                    <RiDeleteBin6Line
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "red",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleDelete(product._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {editProduct && (
          <EditProductModal
            show={showModal}
            handleClose={handleCloseModal}
            product={editProduct}
            handleSave={handleSaveProduct}
          />
        )}
      </div>
    </>
  );
};

export default ManageProducts;
