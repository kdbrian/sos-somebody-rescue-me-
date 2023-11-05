const express = require('express');
const UssdRouter = require('./routes/ussdsms.route')
const bodyParser = require('body-parser');
const App = express();
const GlobalErrorHandler = require('./config/errors.config');
const AuthRouter = require('./routes/auth.route');
const ApiRouter = require('./routes/api.route');
const cookieParser = require('cookie-parser');

// App.use(express.json())
// App.use(body)

App.use(cookieParser())
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));


App.use('/ussd-sms', UssdRouter);
App.use('/api/v1/auth', AuthRouter);
App.use('/api/v1/', ApiRouter);


App.use(GlobalErrorHandler);

App.all('*',(req,res)=>{
    res.status(404).json({
        status:'fail',
        message:`Cannot ${req.method} ${req.url} on this site`
    })
});


module.exports = App;