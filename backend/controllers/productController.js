import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @disc  fetch all products
// @route GET /products
// @access Public
const getProducts = asyncHandler(async (req,res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword 
        ? { name: {$regex: req.query.keyword,$options: 'i'}}
        : {};
    const count = await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
    res.json({products,page,pages: Math.ceil(count/pageSize)});
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
        name: 'M2/02 dark grey and rose gold',
        price: 150000.00,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sevenfriday',
        category: 'Watch',
        countInStock: 5,
        numReviews: 7,
        description: 'The M2/02 takes inspirations from copper pipes, a quintessential mechanical element during the industrial revolution. Featuring a stainless steel box with rose gold PVD treatment and a polished rose gold PVD identification plate, the M2/02 has a dark grey mirror PVD treated bezel with rose gold highlights.'
    })
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})

// @disc  update a product
// @route PUT /products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req,res) => {

     const { name,price,description,image,brand,category,countInStock } = req.body;
     const product = await Product.findById(req.params.id)

     if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);

     } else {
        res.status(404);
        throw new Error('Resource not found');
     }
})

// @disc  delete a product
// @route DELETE /products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req,res) => {

    const product = await Product.findById(req.params.id)

    if (product) {
       await Product.deleteOne({_id: product._id});
       res.status(200).json({message: 'Product deleted'});
    } else {
       res.status(404);
       throw new Error('Resource not found');
    }
})

// @disc  create a review
// @route POST /products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req,res) => {

    const { rating,comment } = req.body;

    const product = await Product.findById(req.params.id)

    if (product) {
       const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
       );

       if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed')
       }
       const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
       }
       product.reviews.push(review);
       product.numReviews = product.reviews.length;
       product.rating = product.reviews.reduce((acc,review) => acc + review.rating,0)/product.reviews.length;
       await product.save();
       res.status(201).json({message: 'Review added'});
    } else {
       res.status(404);
       throw new Error('Resource not found');
    }
})

export { getProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        createProductReview };