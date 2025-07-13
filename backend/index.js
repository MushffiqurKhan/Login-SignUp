const express = require("express");
const app = express();
const connectDB = require('./models/db')
require('dotenv').config();
// const bodyParser = require("body-parser")
const cors =require("cors")
const AuthRoute = require("./routes/AuthRoute")
const ExpensesRouter = require("./routes/ExpensesRouter");
const ensureAuthenticated = require("./middleware/Auth");


const PORT = process.env.PORT || 8000;

//connectivity with db.js
connectDB();

app.get("/",(req,res) =>{
    res.send("success");
});

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/auth",AuthRoute);
app.use("/expenses",ensureAuthenticated,ExpensesRouter)



app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})