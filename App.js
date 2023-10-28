const express = require('express');


const App = express();

App.use(express.json())
// App.use(body)

module.exports = App;