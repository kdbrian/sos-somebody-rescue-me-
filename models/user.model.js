const mongoose = require('mongoose');
const validator = require('validator');

const regPattern = /\b[\w.-]+@s\.karu\.ac\.ke\b/g
const phonePattern = /^(?:\+254|0)[17]\d{8}$/

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate:[
            function (el) {return regPattern.test(el)},
            'provide a valid email adress.'
        ],
        unique:true
    
    },

    registrationNumber:{
        type:String,
        required:true,
        unique:true
    },

    phoneNumber:{
        type:String,
        required:true,
        validate:[
            function(el) {return phonePattern.test(el)},
            "Provide a valid kenyan number"
        ],
        unique:true
    },

    dateJoined:{
        type:Date,
        default:Date.now
    },

    isActive:{
        type:Boolean,
        default:true
    }
});

//delete user cons on account delete

//return only active users
userSchema.pre(/^find/, async function(next){
    this.find({isActive:{$ne:false}});
    next();
})

module.exports = mongoose.model('Users', userSchema);