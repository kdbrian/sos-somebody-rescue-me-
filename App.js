const express = require('express');
const Router = require('./routes/route')
const bodyParser = require('body-parser');
const App = express();
const GlobalErrorHandler = require('./config/errors.config')

// App.use(express.json())
// App.use(body)


App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));


App.use('/api', Router);
App.use(GlobalErrorHandler);

App.all('*',(req,res)=>{
    res.status(404).json({
        status:'fail',
        message:`Cannot ${req.method} ${req.url} on this site`
    })
});

module.exports = App;