process.env.NODE_ENV === 'development' ? require('dotenv').config({path : ".env.dev"}) : require('dotenv').config({path : ".env.prod"});
process.env.NODE_ENV === 'production' ? require('morgan')('dev') : require('morgan')('combined');

const App = require('./App');

const port = process.env.PORT || 8009

App.listen(port, ()=>{
    console.log(`Server started at http://localhost:${port}/emerg`);
})