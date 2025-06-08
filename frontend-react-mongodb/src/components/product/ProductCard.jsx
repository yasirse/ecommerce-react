import React, { useRef, useEffect,useState  } from 'react';
import { FaStar } from 'react-icons/fa6';
import "./product.css";


const ProductCard = () => {
  const carouselRef = useRef(null);
  const [zoomIndex, setZoomIndex] = useState(null);
  return (
    <div className="container mt-4">
      <div className="row  bg-product-card border rounded mt-5 py-sm-5">
        {/* Left Column: Image Carousel */}
        <div className="col-12 col-sm-6 ">
        <div className="container mt-2 mt-sm-0 ">
  
          <div id="mainCarousel" className="carousel slide " data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="./images/7.webp" className=" w-100 zoom-effect" alt="Image 1" style={{ height: '400px', objectFit: 'contain', }} />
              </div>
              <div className="carousel-item">
                <img src="./images/2.jfif" className=" w-100 zoom-effect" alt="Image 2" style={{ height: '400px', objectFit: 'contain' }} />
              </div>
              <div className="carousel-item">
                <img src="./images/3.jfif" className=" w-100 zoom-effect" alt="Image 3" style={{ height: '400px', objectFit: 'contain' }} />
              </div>
              <div className="carousel-item">
                <img src="./images/5.webp" className=" w-100 zoom-effect " alt="Image 4" style={{ height: '400px', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
 
        <div className="row mt-3 ">            
            <div className='d-flex gap-3 justify-content-center align-items-center mb-2 mb-sm-2'>
              <img src="./images/7.webp" className="thumbnail-image  rounded active" style={{ height: '60px', objectFit: 'contain' }} data-bs-target="#mainCarousel" data-bs-slide-to="0" alt="Thumbnail 1"/>
              <img src="./images/2.jfif" className="thumbnail-image  rounded" style={{ height: '60px', objectFit: 'contain' }} data-bs-target="#mainCarousel" data-bs-slide-to="1" alt="Thumbnail 2"/>
              <img src="./images/3.jfif" className="thumbnail-image  rounded" style={{ height: '60px', objectFit: 'contain' }} data-bs-target="#mainCarousel" data-bs-slide-to="2" alt="Thumbnail 3"/>
              <img src="./images/5.webp" className="thumbnail-image  rounded " style={{ height: '60px', objectFit: 'contain' }} data-bs-target="#mainCarousel" data-bs-slide-to="3" alt="Thumbnail 4"/>
            </div>
        </div>
</div>
    
        </div>

        {/* Right Column: Product Details */}
        <div className="col-12 col-sm-6">
          <h4>Product Name</h4>
          <div class="d-flex flex-wrap " style={{height:"10px"}} >
                      <div class="me-2">
                      <FaStar style={{color:"gold" }}/>
                      <FaStar style={{color:"gold" }} />
                      <FaStar style={{color:"gold" }} />
                      <FaStar style={{color:"gold" }} />
                      <FaStar style={{color:"gold" }} />
                      <p class="text-primary fw-semibold mb-2">6548 People rated and reviewed </p>
          </div>
                      
          </div>
          <p class="text-success fw-semibold fs-7 mb-2">In stock</p>
          <p className="text-muted">Royalty-free licenses let you pay once to use copyrighted images and video clips in personal and commercial projects on an ongoing basis without requiring additional. Royalty-free licenses let you pay once to use copyrighted images and video clips in personal and commercial projects on an ongoing basis without requiring additional .</p>
          <h5>
            $99.99 <span className="text-danger ms-2"><del>$129.99</del></span>
          </h5>          
          <div>
          <h4 class="swatch__title">
          <p class="text-success fw-semibold fs-7 mb-2">In stock</p>
            <span>Size: <span >35</span></span>
          </h4>
          <div className="d-flex flex-wrap ">
              <button className="btn btn-outline-primary  px-3      py-2 mb-2 active">35</button>
              <button className="btn btn-outline-primary  px-3  py-2 mb-2">36</button>
              <button className="btn btn-outline-primary  px-3  py-2 mb-2">37</button>
              <button className="btn btn-outline-primary  px-3  py-2 mb-2">38</button>     
              <button className="btn btn-outline-primary disabled text-danger px-3  py-2 mb-2">X</button>
              <button className="btn btn-outline-primary  px-3  py-2 mb-2">40</button>
              <button className="btn btn-outline-primary  px-3  py-2 mb-2">41</button>
              <button className="btn btn-outline-primary  px-3  py-2 mb-2">42</button>
          </div>
        </div>

          <button className="btn btn-primary my-4">Add to Cart</button>
        </div>
      </div>
      <div className="row  bg-product-card border rounded mt-5 py-sm-5">
      <h4>You might also like</h4>
      <div   className="col-12 col-sm-3 border rounded"> <img src="./images/7.webp" className="thumbnail-image  rounded active" style={{ height: '60px', objectFit: 'contain' }} data-bs-target="#mainCarousel" data-bs-slide-to="0" alt="Thumbnail 1"/>
      </div><div   className="col-12 col-sm-3 border rounded"> <img src="./images/7.webp" className="thumbnail-image  rounded active" style={{ height: '60px', objectFit: 'contain' }} data-bs-target="#mainCarousel" data-bs-slide-to="0" alt="Thumbnail 1"/>
      </div>
      <div   className="col-12 col-sm-3 border rounded"> <img src="./images/7.webp" className="thumbnail-image  rounded active" style={{ height: '60px', objectFit: 'contain' }} data-bs-target="#mainCarousel" data-bs-slide-to="0" alt="Thumbnail 1"/>
      </div>
      <div   className="col-12 col-sm-3 border rounded"> <img src="./images/7.webp" className="thumbnail-image  rounded active" style={{ height: '60px', objectFit: 'contain' }} data-bs-target="#mainCarousel" data-bs-slide-to="0" alt="Thumbnail 1"/>
      </div>
      </div>
    </div>
  );
};

export default ProductCard;
