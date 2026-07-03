const app = require('./src/app');
const mongoose = require('mongoose');

function connectToDb (){
    mongoose.connect("mongodb+srv://harshittrivedi164sharma_db_user:VpzztafayQ69jEeg@cohort-2.g6aef2j.mongodb.net/day-6").then(()=>{
        console.log('connected to db');
    });
}
connectToDb();
app.listen(3000, ()=>{
    console.log('http://localhost:3000');
});