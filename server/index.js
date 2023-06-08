const con = require("./db_conn");

const Razorpay = require("razorpay");
const bodyParser = require('body-parser');
con();
const dotenv=require("dotenv");
dotenv.config();

const express=require("express");
const paymentRoutes = require("./routes/payment");
const app=express();
const cors=require("cors");
const port =  5000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());


app.use("/User", require("./routes/user")) ;
app.use("/Property", require("./routes/property"));
app.use("/Request", require("./routes/request"));
app.use("/api/payment/", paymentRoutes);

app.listen(port,()=>{
    console.log("server running:");
 });

