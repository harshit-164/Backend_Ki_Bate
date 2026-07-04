const express =  require('express');
const app =  express();
const router = require('./routes/router');
const cors = require('cors');
const path = require('path');


app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(cors());

app.use('/', router);

module.exports = app;