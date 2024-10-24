import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @disc  fetch all products
// @route GET /products
// @access Public
const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({});
    res.json(products)
})

// @disc  fetch a product
// @route GET /products/:id
// @access Public
const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
})

export {getProducts,getProductById};