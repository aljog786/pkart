import express from 'express';
import dotenv from 'dotenv';
import cookieParser  from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// cookie parser middleware
app.use(cookieParser());


app.get('/',(req,res) => {
    res.send('API running ...');
})

app.use('/products',productRoutes);
app.use('/users',userRoutes);
app.use('/orders',orderRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})