const express = require('express');
const app = express();

const Router = require('./routes/Router');

//  we will config our app and set middleware

app.use(express.json());

app.use('/', Router);



module.exports = app;