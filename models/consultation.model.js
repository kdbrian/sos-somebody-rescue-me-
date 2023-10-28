const mongoose = require('mongoose');

const consSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'Users',
        validate:{
            validator: function(){return mongoose.isValidObjectId()},
            message: 'Invalid user info please contact admin'
        }
    },

    description:{
        type:String,
        maxLength: 120,
        minLength: 5,
        required: true,
        trim:true,
        lowercase:true
    },

    consultationDate:{
        type:Date,
        default:Date.now
    },

    status:{
        type:String,
        enum:['Cleared', 'Pending', 'Assigned doctor', 'Postponed'],
        default:'Pending'
    }
});

module.exports = mongoose.model('Consultations', consSchema);