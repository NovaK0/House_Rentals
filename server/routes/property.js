const express = require('express');
const app = express();
const cloudinary = require('./cloudinary');
const fs = require('fs');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
const router=express.Router();
const PropertySchema = require("../models/PropertySchema");
const nodemailer = require('nodemailer');
const WishlistSchema = require("../models/WishlistSchema");
const pincode = require('pincode-lat-long');
//mail
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:  process.env.MAIL_TRANSPORT_EMAIL,
        pass: process.env.MAIL_TRANSPORT_PASSWORD
    }
});

//property registration
router.post('/addproperty',async (req,res)=>{
   
  
    const userid = req.body.userid;
    const pname = req.body.pname;
    const ptype = req.body.ptype;
    const availfrom = req.body.availfrom;
    const rent = req.body.rent;
    const proparea = req.body.proparea;
    const nobathroom = req.body.nobathroom;
    const parea = req.body.parea;
    const furnishing = req.body.furnishing;
    const maintainance = req.body.maintainance;
    const deposit = req.body.deposit;
    const images = req.body.imageUrl;
    const logo = req.body.logo;
    const city = req.body.city;
    const address = req.body.address;
    const pincode = req.body.pincode;
    const ptennants = req.body.ptennants;
    const adtype = req.body.adtype;
    const statuss = req.body.statuss;
   
    const temp=await PropertySchema.find().sort({_id:-1}).limit(1);
    let prop_id=10000;
    if(temp.length!=0)
    {

        prop_id=(parseInt(temp[0].prop_id)+1);
    }
    if(nobathroom==="" ||  rent===undefined || proparea===undefined || pname==="" ||  ptype==="" || 
    parea==="" || furnishing==="" ||  deposit===undefined || city===undefined ||  address===undefined || pincode==="" ||
     availfrom===undefined )
    {
       
        res.json({"Status":"All fields are neccessary backend"});
        return;
    }
    else{
        const create_new_property=await PropertySchema({
            "prop_id":prop_id,
            "userid":userid,
            "pname":pname,
            "ptype":ptype,
            "availfrom":availfrom,
            "rent":rent,
            "proparea":proparea,
            "nobathroom":nobathroom,
            "parea":parea,
            "furnishing":furnishing,
            "maintainance":maintainance,
            "deposit":deposit,
            "images":images,
            "logo":logo,
            "address":address,
            "city":city,
            "pincode":pincode,
            "ptennants":ptennants,
            "adtype":adtype,
            "statuss":statuss
        });
        const exist=await PropertySchema.findOne({pname:pname});
        if(exist!=null)
        {
            res.json({"Status":"Property already registered"});
        }
        else{
           
            create_new_property.save();
            res.json({"Status":"property added"});
        }
    }
   
})



//check individual property
router.post('/checkproperty',async (req,res)=>{
    const userid = req.body.userid;
    const property = await PropertySchema.find({userid});
    if(property===undefined || property.length==0)
    {
        res.json({"Status":"You don't have any property listed"});
    }
    else{
        res.json(property);
        
    }
   
})

//get all properties
router.post('/getallproperties',async (req,res)=>{
   
    const property = await PropertySchema.find({"statuss":"Vacant"});

    if(property===undefined || property.length==0)
    {
        res.json({"Status":"Sorry :( no properties to show right now"});
    }
    else{
        res.json(property);
        
    }
   
})


//set booking status
router.post('/setstatus',async (req,res)=>{
    const prop_id = req.body.prop_id;
    const data=await PropertySchema.findOne({prop_id});
    await PropertySchema.updateOne({_id:data._id},{statuss:"Rented"}).then(
        () => {
          res.json({
            Status: 'Rented'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            Status: error
          })
        });

   
})

router.post('/setvacatestatus',async (req,res)=>{
    const prop_id = req.body.prop_id;
    const data=await PropertySchema.findOne({prop_id});
    await PropertySchema.updateOne({_id:data._id},{statuss:"Vacant"}).then(
        () => {
          res.json({
            Status: 'Vacated'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            Status: error
          })
        });

   
})

//get prop to display
router.post('/getproperty',async (req,res)=>{
    
    const property = await PropertySchema.find().limit(4);
    if(property===undefined || property.length==0)
    {
        res.json({"Status":"Sorry :( currently no properties to display"});
    }
    else{
        res.json(property);
        
    }


//get single property details
router.post('/getsinglepropdet',async(req,res)=>{
    console.log("single");
    const prop_id = req.body.prop_id;
    const singleprop = await PropertySchema.find({prop_id});
    if(singleprop===undefined || singleprop.length==0 || singleprop==null)
    {
        res.json({"Status":"Data about this property does not exist"});
    }
    else{
        res.json(singleprop);
    }
})
})
//list wishlist
router.post('/listwishlist',async(req,res)=>{
    const userid = req.body.userid;
  
    const wishlist = await WishlistSchema.find({userid});
    let arr = []
   
    for(let i =0;i<wishlist.length;i++)
    {
        arr.push(wishlist[i].prop_id);
    }
    
    let props = [];
    let prop;
    for(let j=0;j<arr.length;j++)
    {
        prop = await PropertySchema.findOne({"prop_id":arr[j]});
        props.push(prop);
    }
  const copyprop = props.slice(1);
    
    if(props===null || wishlist.length==0 || wishlist==undefined)
    {
        res.json({"Status":"You don't have any property in your wishlist"});
    }
    else{
        console.log(copyprop);
       
        res.json(copyprop);
    }
})

//Save to wishlist
router.post('/wishlist',async(req,res)=>{
    const prop_id = req.body.prop_id;
    const userid = req.body.userid;
   
    const temp=await WishlistSchema.find().sort({_id:-1}).limit(1);
    let wishid = 1000;
    if(temp.length!=0)
    {
        wishid=(parseInt(temp[0].wishid)+1);
    }
    if(prop_id==null || userid==null)
    {
        res.json({"Status":"There was an issue while adding the property to wishlist"});
    }
    else{
        const create_new_wishlist = await WishlistSchema({
            'wishid':wishid,
            'prop_id':prop_id,
            'userid':userid
        });

        const exist=await WishlistSchema.findOne({prop_id,userid});
        if(exist!=null)
        {
            res.json({"Status":"Property already added to wishlist"});
        }
        else{
            create_new_wishlist.save();
            res.json({"Status":"Property added to Wishlist"});
        }
    }
})

//getprop image
router.post('/getpropimg',async(req,res)=>{
    const prop_id = req.body.prop_id;
    const singleprop = await PropertySchema.find({prop_id});
    if(singleprop===undefined || singleprop.length==0 || singleprop==null)
    {
        res.json({"Status":"Data about this property does not exist"});
    }
    else{
       
        res.json({"data":singleprop[0].images});
    }
})

//get singlepropdet
router.post('/getsingleprop',async(req,res)=>{
    const prop_id = req.body.prop_id;
    const singleprop = await PropertySchema.find({prop_id});
     let points = pincode.getlatlong(singleprop[0].pincode);

    if(singleprop===undefined || singleprop.length==0 || singleprop==null)
    {
        res.json({"Status":"Data about this property does not exist"});
    }
    else{
       
        res.json({"props":singleprop,"point":points});
    }
})

//Remove From wishlist
router.post('/removewishlist',async(req,res)=>{
    const prop_id = req.body.prop_id;
   
    const remove = await WishlistSchema.deleteOne({prop_id});
    if(remove==null || remove===undefined)
    {
        res.json({"Status":"There was some issue in removing the desired property"});
    }
    else{
        res.json({"Status":"Removed Successfully"});
    }
})

//Remove From Property
router.post('/deleteone',async(req,res)=>{
    const prop_id = req.body.prop_id;
   
    const remove = await PropertySchema.deleteOne({prop_id});
    if(remove==null || remove===undefined)
    {
        res.json({"Status":"There was some issue in removing the desired property"});
    }
    else{
        res.json({"Status":"Removed Successfully"});
    }
})

//Update details of Property
router.post('/updatedet',async(req,res)=>{
    const prop_id = req.body.prop_id;
    const userid = req.body.userid;
    const pname = req.body.pname;
    const ptype = req.body.ptype;
    const availfrom = req.body.availfrom;
    const rent = req.body.rent;
    const proparea = req.body.proparea;
    const nobathroom = req.body.nobathroom;
    const parea = req.body.parea;
    const furnishing = req.body.furnishing;
    const maintainance = req.body.maintainance;
    const deposit = req.body.deposit;
    const images = req.body.allimg;
    const logo = req.body.logo;
    const city = req.body.city;
    const address = req.body.address;
    const pincode = req.body.pincode;
    const ptennants = req.body.ptennants;
    const adtype = req.body.adtype;

 
    const doc = await PropertySchema.findOne({prop_id});


    const updateresult = PropertySchema.findOneAndUpdate({_id:doc._id},
        req.body,
        {upsert: true}, function(err, doc) {
            if (err) return res.json(500, {error: err});
            return res.json({"Status":"Successfull"});}
      
    )

    console.log(updateresult);

})


//average cost of property
router.get('/avgcost',async(req,res)=>{
 
    const allprop = await PropertySchema.find();
    if(allprop==undefined || allprop.length==0)
    {
        res.json({"Status":"No data"});
    }
    else{
       
            let bhk1=0;
            let bhk2=0;
            let bhk3=0;
            let bhk33=0;
            let cbhk1=1;
            let cbhk2=1;
            let cbhk3=1;
            let cbhk33=1;

            let bbhk1=0;
            let bbhk2=0;
            let bbhk3=0;
            let bbhk33=0;
            let cbbhk1=1;
            let cbbhk2=1;
            let cbbhk3=1;
            let cbbhk33=1;
           for(let i = 0;i<allprop.length;i++)
           {

            if(allprop[i].adtype=="Rent")
            {
                if(allprop[i].ptype=="1BHK")
                {
                    cbhk1=cbhk1+1;
                    bhk1=bhk1+parseInt(allprop[i].rent);
                }
                else if(allprop[i].ptype=="2BHK")
                {
                    cbhk2=cbhk2+1;
                    bhk2=bhk2+parseInt(allprop[i].rent);
                    
                }
               else if(allprop[i].ptype=="3BHK")
                {
                    cbhk3=cbhk3+1;
                    bhk3+=parseInt(allprop[i].rent);
                    
                }
                else if(allprop[i].ptype=="3+BHK")
                {
                    cbhk33=cbhk33+1;
                    bhk33+=parseInt(allprop[i].rent);
                }
            }
            else
            {
                if(allprop[i].ptype=="1BHK")
                {
                    cbbhk1=cbbhk1+1;
                    bbhk1=bbhk1+parseInt(allprop[i].rent);
                }
                else if(allprop[i].ptype=="2BHK")
                {
                    cbbhk2=cbbhk2+1;
                    bbhk2=bbhk2+parseInt(allprop[i].rent);
                    
                }
               else if(allprop[i].ptype=="3BHK")
                {
                    cbbhk3=cbbhk3+1;
                    bbhk3+=parseInt(allprop[i].rent);
                    
                }
                else if(allprop[i].ptype=="3+BHK")
                {
                    cbbhk33=cbbhk33+1;
                    bbhk33+=parseInt(allprop[i].rent);
                }
            }

            
             
            }
           
          
           if(bhk1!=0)
         {
            bhk1 = Math.round(bhk1/(cbhk1-1))
         }
         if(bhk2!=0)
         {
            bhk2 = Math.round(bhk2/(cbhk2-1));
         }
         if(bhk3!=0)
         {
           
            bhk3 =Math.round(bhk3/(cbhk3-1));
            
            
         }
         if(bhk33!=0)
         {
            bhk33 = Math.round(bhk33/(cbhk1-1))
         }




         if(bbhk1!=0)
         {
            bbhk1 = Math.round(bbhk1/(cbbhk1-1))
         }
         if(bbhk2!=0)
         {
            bbhk2 = Math.round(bbhk2/(cbbhk2-1));
         }
         if(bbhk3!=0)
         {
           
            bbhk3 =Math.round(bbhk3/(cbbhk3-1));
            
            
         }
         if(bbhk33!=0)
         {
            bbhk33 = Math.round(bbhk33/(cbbhk1-1))
         }

        

        
       
       
     res.json({"bhk1":bhk1,"bhk2":bhk2,"bhk3":bhk3,"bhk33":bhk33,"bbhk1":bbhk1,"bbhk2":bbhk2,"bbhk3":bbhk3,"bbhk33":bbhk33})   
  
    }
 
})

//Get property details by city name;
router.post('/getpropbycity',async(req,res)=>{
    console.log("hi");
    const city= req.body.city;
 
    const prop = await PropertySchema.find({"city":city});
    if(prop.length===0 || prop===undefined)
    {
        res.json({Message:"Sorry there are no properties in this city"});
    }
    else{
        res.json(prop);
    }
})

//get all properties
router.post('/filteredData',async (req,res)=>{
   var data=req.body;
var start,end;
var property;
if(data.range!=undefined){
     start=parseInt(data.range.split("-")[0]);
     end=parseInt(data.range.split("-")[1]);
     delete data.range;
     
     property = await PropertySchema.find( {
        $and: [
           data,
           {rent: {$gte:start,$lte:end} }
        ]
     } )

}
else{
   
    property = await PropertySchema.find(data);
    console.log(property);
}

    if(property===undefined || property.length==0)
    {
        res.json({"Status":"Sorry :( no properties to show right now"});
    }
    else{
        res.json(property);
        
    }
   
})


module.exports = router ; 