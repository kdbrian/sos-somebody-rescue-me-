const alertModel = require("../models/alert.model");
const consultationModel = require("../models/consultation.model");
const Error = require("../models/error.model");
const userModel = require("../models/user.model");
const catchAsync = require("../util/catchAsync");

//! Consultations

exports.fetchConsultation = catchAsync(async (req, res, next)=>{
    
    const user = req.user;

    const {consId} = req.params

    // console.log(req.params);

    const consultation = await consultationModel.findOne({_id:consId, user});

    if(!consultation)
        return next(new Error("Failed to get consultation", 404));

    res.status(200).json({
        consultation
    });

})

exports.fetchConsultations = catchAsync(async (req, res, next)=>{
    
    const user = req.user;

    const consultations = await consultationModel.find({user});

    res.status(200).json({
        consultations
    });

})

exports.deleteConsultation = catchAsync(async (req, res, next)=>{
    
    const {user} = req
    const {consId} = req.params
    const consultation = await consultationModel.findOne({user, _id: consId});

    if(!consultation)
        return next(new Error("Failed to get consultation", 404));

    await consultationModel.findByIdAndDelete(consId);

    res.status(204).json({success: true});

});

exports.updateConsultation = catchAsync(async (req, res, next)=>{

    const {user} = req
    const {consId} = req.params
    const consultation = await consultationModel.findOne({user, _id: consId});

    if(!consultation)
        return next(new Error("Failed to get consultation", 404));

    const {description, consultationDate, status} = req.body

    await consultationModel.findByIdAndUpdate(consId, {description, consultationDate, status});

    res.status(201).json({success:true});
});

