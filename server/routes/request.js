const express=require("express");
const RequestSchema = require("../models/RequestSchema");
const PropertySchema = require("../models/PropertySchema");
const UserSchema = require("../models/UserSchema");
const router=express.Router();


const nodemailer = require('nodemailer');
//mail
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_TRANSPORT_EMAIL,
        pass: process.env.MAIL_TRANSPORT_PASSWORD
    }
});

router.post('/request',async(req,res)=>{
    let reqid= 100
    const stat="Pending";
    const temp=await RequestSchema.find().sort({_id:-1}).limit(1);
   
    if(temp.length!=0)
    {
        reqid=(parseInt(temp[0].reqid)+1);
    }
    const userid = req.body.userid;
    const prop_id = req.body.prop_id;
    const prop = await PropertySchema.find({prop_id});
    const sellerid = prop[0].userid;
    const stateee = "Main";
    const create_new_request = await RequestSchema({
        "reqid":reqid,
        "prop_id":prop_id,
        "buyerid":userid,
        "sellerid":sellerid,    
        "stat":stat
    })
    const exist = await RequestSchema.findOne({prop_id:prop_id,buyerid:userid});
    if(exist!=null)
    {
        res.json({"Status":"You have already sent a contact request"});
    }
    else{
        create_new_request.save();
        res.json({"Status":"Request sent"});
    }

})

router.post('/getreq',async(req,res)=>{

    const userid = req.body.userid;
    const reqs = await RequestSchema.find({"sellerid":userid,"stat":"Pending"});
    if(reqs==null || reqs==undefined || reqs.length==0)
    {
        res.json({"Status":"Noreq"});
    }
    else{
        let propid = []
        let buyerid = []
        const final_data=[]
       
       for(let i = 0; i<reqs.length;i++)
       {
            propid.push(reqs[i].prop_id);
            buyerid.push(reqs[i].buyerid);
       }
       for(let j = 0;j<reqs.length;j++)
       {
         const propone = await PropertySchema.findOne({"prop_id":propid[j]});
         const buyerone = await UserSchema.findOne({"Userid":buyerid[j]});
         if(propone==undefined || buyerone==undefined)
         {
   
         }
         else{
          final_data.push({"property":propone,"user":buyerone})
         }
      
       
       }
       if(final_data.length==0 || final_data==undefined)
       {
        res.json({"Status":"No"});
       }
       else{
        res.json({data:final_data});
       }
       
 
      
    }
})


router.post('/mark-request',async(req,res)=>{
    const prop_id=req.body.prop_id
    const buyerid=req.body.buyerid
    const data=await RequestSchema.findOne({prop_id,buyerid});
    await RequestSchema.updateOne({_id:data._id},{stat:"Accepted"}).then(
        () => {
          res.json({
            Status: 'Request Accepted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            Status: error
          })
        });
    
})


router.post('/delete-request',async(req,res)=>{
    const prop_id=req.body.prop_id
    const buyerid=req.body.buyerid
    const data=await RequestSchema.findOne({prop_id,buyerid});
    await RequestSchema.deleteOne({_id:data._id}).then(
        () => {
          res.json({
            Status: 'Request Rejected!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            Status: error
          })
        });
    
})

router.post('/checkstat',async(req,res)=>{
  const prop_id = req.body.prop_id;
  const buyerid= req.body.buyerid;
  const data =await RequestSchema.findOne({prop_id,buyerid,"stat":"Accepted"});
  if(data==undefined || data.length==0)
  {
    res.json({"Status":"Not accepted"});
  }
  else{
   
   res.json(data);
  }
})

router.post('/buyerrequest',async(req,res)=>{
 const buyerid =  req.body.userid;
 const reqs = await RequestSchema.find({buyerid});

 if(reqs==null || reqs==undefined || reqs.length==0)
 {
     res.json({"Status":"Noreq"});
 }
 else{
     let propid = []
     let sellerid = []
     const final_data=[]
    
    for(let i = 0; i<reqs.length;i++)
    {
         propid.push(reqs[i].prop_id);
         sellerid.push(reqs[i].sellerid);
    }
    for(let j = 0;j<reqs.length;j++)
    {
      const propone = await PropertySchema.findOne({"prop_id":propid[j]});
      const sellerone = await UserSchema.findOne({"Userid":sellerid[j]});
      const statone = await RequestSchema.findOne({"prop_id":propid[j],"sellerid":sellerid[j]});
      if(propone==undefined || sellerone==undefined)
      {

      }
      else{
        final_data.push({"property":propone,"user":sellerone,"req":statone});
      }
    }
    if(final_data.length==0 || final_data==undefined)
    {
     res.json({"Status":"No"});
    }
    else{
     res.json({data:final_data});
    } 
 }
})


module.exports = router ; 