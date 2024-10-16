const notFound = (req,res,next) => {
    const error = new Error(`Not Found - ${req.orginalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err,req,res,next) => {
let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
let message = err.message;

//check for mongoose bad ObjectId
if (err.name === 'CasError' && err.kind === 'ObjectId') {
    message = `Resource not found`;
    statusCode = 404;
} 
res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack 
});

};

export { notFound,errorHandler };
