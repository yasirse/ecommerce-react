import React, { useState, useEffect } from "react";
import { changeTab } from "../../store/tabSlice";
import ProductItem from "./ProductItem";
import { useDispatch } from "react-redux";
const apiUrl = import.meta.env.VITE_APP_API_URL;
import Spinner from "../Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const limit=10;
  dispatch(changeTab("home"));

  const updateNews=async()=>
    {
      //console.log("apikey="+props.apiKey);
      setProgress(10);
      //const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      const url=`${apiUrl}/api/product/products?page=1&limit=10`;
      setLoading(true);
      let data = await fetch(url);
      setProgress(30);
      let parsedData = await data.json();
      setPage(2);
      setProducts(parsedData.records);
      setProgress(70);
      setLoading(false);  
      setProgress(100);
       // Set total records on the first fetch
    if (totalRecords === 0) setTotalRecords(parsedData.totalRecords);
    }

    
    useEffect(() => {
      //document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
      updateNews(); 
          }, [])

      const fetchMoreData = async () => {   
        console.log("hasmore=",hasMore);
        const url = `${apiUrl}/api/product/products?page=${page}&limit=${limit}`;
        //setPage(page+1)        
        let data = await fetch(url);
        let newProducts = await data.json();
        console.log("fetch more data=",newProducts.records);
        setProducts([...products, ...newProducts.records]);
        // Check if we've loaded all data
      }
    
      useEffect(() => {
        setHasMore(products.length !== totalRecords);
        console.log("new size of products",products.length)
    }, [products]);
  
  if (error) {
    return( 
    <div className="d-flex justify-content-center  align-items-center w-100 ">
      <div className=" mx-5 my-5"><h6>{error.message}</h6></div>
    </div>);
  }

  return (
    <>  
    {/* {
      loading&&<Spinner/>
    } */}
    <InfiniteScroll
                    dataLength={50}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<Spinner/>}
                > 
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
      </InfiniteScroll>
    </>
  );
};

ProductList.defaultProps = { 
  category: 'general',
  setProgress:0,
}
export default ProductList;