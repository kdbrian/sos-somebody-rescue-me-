const mongoose = require('mongoose');

module.exports = async () =>{
    try{
        await mongoose.connect(process.env.DB_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log(`Connected to MongoDB at `+`${process.env.DB_URI}`.split('://')[0]);
    }
    catch(err){
        console.log(err);
    }
}