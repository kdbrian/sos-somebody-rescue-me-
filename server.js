require('dotenv/config');
if(process.env.NODE_ENV === 'development'){
    require('dotenv').config({path : ".env.dev"}) 
}else
    require('dotenv').config({path : ".env.prod"});

// process.env.NODE_ENV === 'production' ?: require('morgan')('combined');
const dbConnect = require('./config/db.config');
const App = require('./App');


if(process.env.NODE_ENV === 'development'){
    App.use(require('morgan')('dev'))
    console.log(process.env.NODE_ENV);
}


const port = process.env.PORT || 8109

// console.log(port);
dbConnect()

App.listen(port, ()=>{
    console.log(`Server started at http://localhost:${port}/api`);
})