const mongoose=require("mongoose");
const {Schema}=mongoose;
const WishlistSchema = new Schema({
    'wishid':{
        type:String,
        required:true
    },
    'prop_id':{
        type:String,
        required:true
    },
    'userid':{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Wishlist",WishlistSchema);