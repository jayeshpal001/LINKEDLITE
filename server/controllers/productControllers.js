const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductSchema');


const getAllProducts = asyncHandler(async(req, res) => {
  const products = await Product.find(); 
  if (products.length<=0) {
    res.status(404)
    throw new Error("No products");
  }
  res.status(200).json(products);
})

const getProductById = asyncHandler(async(req, res) => {
  const id = Number(req.params.id);
  const product = await Product.findById(id); 
  if (!product) {
    res.status(404)
    throw new Error("Product not found");
  }
  res.json(product);
});

module.exports = {
  getAllProducts,
  getProductById,
};
