import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../store/cartSlice";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const ProductItem = ({ product }) => {
  const { products } = useSelector((state) => state.cart);
  const cartProduct = products.find(
    (cartProduct) => cartProduct.id === product._id
  );

  const dispatch = useDispatch();
  // Split the string by spaces to get an array of words
  const words = product?.description.split(" ");
  const first10Words = words.slice(0, 6);
  const description = first10Words.join(" ");
  const words2 = product?.name.split(" ");
  const first3Words = words2.slice(0, 3);
  const title = first3Words.join(" ");
  const handleAddToCart = () => {
    dispatch(
      addProduct({
        id: product._id,
        name: product.name,
        price: product.price,
        totalQuantity: product.quantity,
        orderedQuantity: 1,
        picture: product.picture,
      })
    );
  };

  return (
    <>
    
    <div className="row justify-content-center mx-lg-2 ">
    {/* col-12 col-sm-12 col-md-12 col-lg-12 */}
            <div className=" my-2 mr-2">
                <div className="card mx-auto" style={{width: "288px"}}>
        {product.picture && (
          <img
            className="border "
            src={`${apiUrl}/uploads/${product.picture}`}
            alt={product.name}
            style={{
              width: "100%",
              height: "200px",
              
            }}
          />
        )}
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p className="card-text">
            {description} <Link to="/productcard">more...</Link>
          </p>
          <p className="card-text">Rs. {product.price}</p>
          <div className="d-grid">
            {(cartProduct &&
              cartProduct.orderedQuantity === product.quantity) ||
            product.quantity === 0 ? (
              <button type="button" className="btn btn-danger btn-sm">
                Out of Stock
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};
export default ProductItem;
