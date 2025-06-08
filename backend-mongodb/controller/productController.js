
const { placeOrderDB } = require('../model/productModel');
const ProductsModel = require('../model/Product');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE);


const addProduct=async(req, res) => {
    try{
          if (!req.file) {
            return res.status(400).json({message: 'Picture not attached'});
          }
          console.log("File received",req.file.filename);
          const picture = req.file.filename;
          const { name,price,quantity,description} = req.body;
          console.log("values of name, price,descrptin",name, price,quantity,description,picture);
          //const result = await addProductDB(name,price,quantity,description,imageName);
          const addproduct = new ProductsModel({
            name, price,quantity,description,picture
        })
        const savedproduct = await addproduct.save()
          res.status(200).json({message: 'Product Added Successfuly'});
        }
    catch (error)
      {
          console.log("error:",error);
          res.status(500).json({ message: 'Error adding product'});
      }
  }

const placeOrder=async(req,res)=>{
  try{
      const { name,phone,address,products} = req.body;
      console.log("values of name, price,descrptin",name,phone,address,products);
      for (const product of products) {
        const newQuantity=product.totalQuantity-product.orderedQuantity;
        console.log("new quantity=",newQuantity);
        const result = await placeOrderDB(product.id, newQuantity);
        console.log(result);  // Log the result of placeOrder
      }
        return res.status(200).json({message: 'Order successfully placed'});
    }
    catch(error)
    {
      console.log("place order error=",error);
      return res.status(500).json(error);
    } 
}

//Endpoint to Get Products Listh
const allProducts = async (req,res)=>{
  try{
    // If Page no. is defined then 
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no page is provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page
    const skip = (page - 1) * limit;
    console.log("page=",limit);
    // Count all documents in the collection
    const totalRecords = await ProductsModel.countDocuments();
    console.log("total record=",totalRecords);
    // Fetch records from MongoDB with pagination
    const records = await ProductsModel.find()
    .skip(skip)  // Skip the appropriate number of records
    .limit(limit);  // Limit the number of records to fetch
    //console.log("record fetched",records);
    if(records)
      {
        console.log("list received",records);
        res.status(200).json({records,"totalRecords":totalRecords});
      }
      else
      {
        res.status(404).json({message:"No product found"});
      }
    }
        catch (error)
        {
          res.status(500).json({ message: 'Error fetching products'});
        }
    }
// Delete product
const deleteProduct=async (req,res)=>{
  try{
    const {id} = req.body;
    //const deleted = await deleteProduct(id);
    const deleted= await ProductsModel.findByIdAndDelete(id);
    console.log("from delete product function result",deleted);
    if(deleted)
    {
      //console.log("list received",list);
      res.status(200).json({message:"deleted"});
    }
    else
      res.status(404).json({message:"Product not found"});
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching products'});
  }
}
//To update the product
const updateproduct = async (req, res) => {
  try{
    if (!req.file) {
      return res.status(400).json({message: 'Picture not attached'});
    }
    console.log("File received",req.file.filename);
    const picture = req.file.filename;
    const { id,name,price,quantity,description} = req.body;
    console.log("values of name, price,descrptin",id,name, price,quantity,description,picture);
    //const result = await updateProduct(id,name,price,quantity,description,imageName);
    const updated= await ProductsModel.findByIdAndUpdate(_id=id,{name,price,quantity,description,picture})
    res.status(200).json({message: 'Product Updated Successfuly'});
  }
  catch (error) {
    console.log("error:",error);
    res.status(500).json({ message: 'Error adding product'});
  }
};
// Update product without picture
const updateProductWithoutPic=async (req, res) => {
  try{
    const {id, name,price,quantity,description} = req.body;
    console.log("values of name, price,descrptin",req.body,name, price,quantity,description);
    //const result = await updateProductWithoutPic(id,name,price,quantity,description);
    const result= await ProductsModel.findByIdAndUpdate(_id=id,{name,price,quantity,description});
    if(result)
      {
      console.log("result of update without picture",result);
      res.status(200).json({message: 'Product Updated Successfuly'});
      }
    else
    res.status(404).json({message: 'Product Not Found'});
  }
  catch (error) {
    console.log("error:",error);
    res.status(500).json({ message: 'Error adding product'});
  }
}
//Integration with Stripe Checkoutt
const stripCheckout=async (req,res)=>{
  console.log("stripe key value",process.env.STRIPE_PRIVATE);
  const {products} = req.body;
  console.log("Stripe Products",products);
  const lineItems = products.map((product)=>({
    price_data:{
      currency:'usd',
      product_data:{
        name:product.name,
      },
      unit_amount:product.price,
    },
    quantity:product.totalQuantity
  }));
  console.log(lineItems);
  const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    line_items:lineItems,
    mode:'payment',
    success_url:'http://localhost:3000/success',
    cancel_url:'http://localhost:3000/cancel',
  })
  console.log("Server side stripe response",session);
  res.json({id:session.id});
}


module.exports = {addProduct,placeOrder,allProducts,deleteProduct,updateproduct,updateProductWithoutPic,stripCheckout};