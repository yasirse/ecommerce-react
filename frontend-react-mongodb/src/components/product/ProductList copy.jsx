import React, { useState, useEffect } from "react";
import { changeTab } from "../../store/tabSlice";
import ProductItem from "./ProductItem";
import { useDispatch } from "react-redux";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  dispatch(changeTab("home"));
  useEffect(() => {
    setLoading(false);
    fetch(`${apiUrl}/api/product/products`)
    //fetch("http://192.168.100.6:3000/api/product/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Internal Server Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
        //console.log(products);
        setLoading(true);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loader mx-5 my-5"></div>;
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
     {loading ? (
  <div className="d-flex justify-content-center align-items-center w-100 ">
    <div className="loader mx-5 my-5"></div>
  </div>
) : ""}
      <div className="d-flex flex-row justify-content-center flex-wrap w-100 p-2">
        <div className="d-flex flex-row justify-content-center w-100 mt-3 ">
          <h4>Product List</h4>
        </div>
        {/*if you use mysql procedures then pass product as products[0], for simple sql pass products
        for Mongodb pass as products.
        */}
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
