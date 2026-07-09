const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


const authRouter = require("./routes/auth.routes");


app.use(express.json());
app.use(cookieParser());

// ye jo route hai ye prefix hai jo auth router je andr particular api hit krne se pehle aayega
app.use("/api/auth", authRouter);





module.exports = app;