import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @disc  fetch all products
// @route GET /products
// @access Public
const getProducts = asyncHandler(async (req,res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments();
    const products = await Product.find({})
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
        name: 'Pixel 9 Pro 5G 256GB',
        price: 99000.00,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Google',
        category: 'Smartphone',
        countInStock: 10,
        numReviews: 10,
        description: 'Google Tensor G4,Titan M2 security coprocessor,16 GB RAM,256 GB,Typical 4700mAh(Minimum 4558mAh),Super Actua display(LTPO),6.3-inch(161 mm),152.8 mm(h) x 72 mm(w) x 8.5 mm(d),199g.'
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