const mongoose=require("mongoose");
const {Schema}=mongoose;
const PaymentSchema = new Schema({
    'paymentid':{
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
    },
    'amount':{
        type:String,
        required:true
    },
    'duration':
    {
        type:String,
        required:true
    },
    'paymentdate':
    {
        type:Date,
        required:true
    }

})
module.exports=mongoose.model("payment",PaymentSchema);