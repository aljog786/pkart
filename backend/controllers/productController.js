import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @disc  fetch all products
// @route GET /products
// @access Public
const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({});
    res.json(products);
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

// @disc  create a product
// @route POST /products
// @access Private/Admin
const createProduct = asyncHandler(async (req,res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0.00,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'description'
    })
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})

export {getProducts,getProductById,createProduct};