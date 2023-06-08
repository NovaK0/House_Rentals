const mongo=require("mongoose");

const connection=()=>{
   
mongo.connect("mongodb://localhost:27017/houserentals").then
(()=>console.log("mongoose connected")).catch((error)=>
console.log(error));
}


module.exports=connection