const mongoose=require("mongoose");
const {Schema}=mongoose;
const RequestSchema = new Schema({
    'reqid':{
        type:String,
        required:true
    },
    'prop_id':{
        type:String,
        required:true
    },
    'buyerid':{
        type:String,
        required:true

    },
    'sellerid':{
        type:String,
        required:true
        
    }
    ,
    'stat':{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Request",RequestSchema);