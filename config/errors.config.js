const { json } = require('body-parser');
const errorObj = require('../models/error.model');

module.exports = (err,req,res,next) =>{

    // console.log(err);

    if (err.code === 11000) err=handleDuplicateError(err);
    if (err.name === 'ValidationError') err=handleValidationError(err);

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'server failure';

    console.log(JSON.stringify({
        status:`${err.statCode}`.startsWith('4') ?'fail':'error',
        message:err.message,
        stack:err.stack,
        err
    }));
    res.set('Content-Type: Text/plain');
    
    res.status(err.statusCode).send(`${JSON.stringify({
        status:`${err.statCode}`.startsWith('4') ?'fail':'error',
        message:err.message,
        stack:err.stack,
        err
    })}`);
    
}

const handleDuplicateError = (err)=>{
    let duplicatefields = [];

    for(field in err.keyPattern)
        duplicatefields.push(field);

        return new errorObj(`Duplicate ${duplicatefields.toString()} choose another one`,400);
}

const handleValidationError = (err) => {
    return new errorObj(`${err.message}`,400);
}