const app = require('./src/app');
require('dotenv').config();
const connectToDb = require('./src/config/database');

// we will start server and connect db intially

connectToDb();

app.listen(3000, ()=>{
    console.log('http://localhost:3000');
});