const ErrorObj = require("../models/error.model");
const userModel = require("../models/user.model");
const catchAsync = require("../util/catchAsync");

/***
 * Register a user and automatically log them in
 * 
 */
exports.register = catchAsync(async (req, res, next)=>{
    
    const {registrationNumber, email } = req.body;

    const user = await userModel.create({registrationNumber, email});

    const token = await user.signToken();
    
    res.status(200).cookie("token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: false
    }).json({
        status:201,
        data:{
            user,
            token
        }
    });
})


/***
 * Uses the users registration number to assign a session to the user
 * @param registrationNumber the users registration number
 * passed through the request body as a string
 */
exports.login = catchAsync(async (req, res, next)=>{
    
    const {registrationNumber} = req.body;

    // console.log(req.body);

    const user = await userModel.findOne({registrationNumber});

    if(!user)
        return next(new ErrorObj("Invalid user details", 400));

    const token = await user.signToken();
    
    res.status(200).cookie("token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: false
    }).json({
        status:200,
        data:{
            user,
            token
        }
    });

});


exports.logout = catchAsync(async (req, res, next)=>{

    res.status(200).cookie('token',null, {httpOnly:true, expires: new Date(Date.now()) }).json({
        status:'success'
    });
    // res.clearCookie("token").json({success : true}  );   
})

exports.changeAccountStatus = catchAsync (async (req, res, next) =>{})