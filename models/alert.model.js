const mongoose = require('mongoose')

const alertSchema = mongoose.Schema({

    priority:{
        type:String,
        enum:['critical', 'unspecified', 'not-critical'],
        default:''
    },

    setBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    dateSet:{
        type: Date,
        default: Date.now
    },

    //set by API services
    userLocation:{
        longitude:String,
        latitude:String,
        Area: String
    },

    condition:{
        type:String
    }

});


module.exports = mongoose.model('Alert', alertSchema);