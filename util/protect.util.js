const Error = require("../models/error.model");
const userModel = require("../models/user.model");
const catchAsync = require("./catchAsync")
const jwt = require('jsonwebtoken');
const promisify = require('promisify');

exports.protect = catchAsync(async (req, res, next)=>{

    // console.log('here');
    
    //fetch token
    const token = !`${req.headers.authorization}`.startsWith('Bearer') ? req.cookies.token : `${req.headers.authorization}`.split(' ')[1];

    // console.log(token);

    if(!token)
        return next(new Error("please login first",401));

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded);

    const user = await userModel.findById(decoded._id);

    if(!user)
        return next(new Error("Invalid token", 401))


    //add user to request
    req.user = user;
    next();
}) 