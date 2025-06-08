const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

const productRouter = express.Router();
var fetchuser = require('../middleware/fetchuser');
const productController=require('../controller/productController');

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');                                  
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Product Route
productRouter.post('/placeorder',productController.placeOrder);
productRouter.post('/add-product',fetchuser,upload.single('file'),productController.addProduct);
productRouter.post('/update-product',upload.single('file'), productController.updateproduct)
productRouter.get('/products',productController.allProducts);
productRouter.post('/deleteProduct',productController.deleteProduct);
productRouter.post('/update-product-without-picture', upload.none(),productController.updateProductWithoutPic);
productRouter.post('/create-checkout-session', productController.stripCheckout);


module.exports = productRouter;