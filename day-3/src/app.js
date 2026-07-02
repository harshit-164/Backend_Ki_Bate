const express = require('express');
const app = express();

const basicRoutes = require('./routes/basicRoutes');
const notesRoutes = require('./routes/notesRoutes');


app.use(express.json());

app.use('/', basicRoutes);
app.use('/notes', notesRoutes)

module.exports = app;
