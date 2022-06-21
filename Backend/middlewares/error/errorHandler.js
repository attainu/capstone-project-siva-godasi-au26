//by using this to convert html err to json error
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode === 200?500:res.statusCode;
    res.status(statusCode)
    res.json({
        message:err?.message,
        //to check which line of code is having error
        stack : process.env.NODE_ENV === "production" ? null : err.stack,
    })
}

//user is trying to access not defined router for that handling
const notFound = (req,res,next)=>{
    const error = new Error(`Not Found-${req.originalUrl}`)
    res.status(404);
    next(error)
}

module.exports = {
    errorHandler,
    notFound
}