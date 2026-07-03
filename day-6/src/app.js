const express = require('express');
const app = express();
const BasicRouter = require('./routes/BasicRouter')

app.use('/', BasicRouter);





module.exports = app;