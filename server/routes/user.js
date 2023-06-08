const express=require("express");
const UserSchema = require("../models/UserSchema");
const router=express.Router();
const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');
//mail
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:  process.env.MAIL_TRANSPORT_EMAIL,
        pass: process.env.MAIL_TRANSPORT_PASSWORD
    }
});

//get type of user
router.post('/gettype',async (req,res)=>{
    const Userid = req.body.userid;
    const usertype =await UserSchema.find({Userid});
    if(usertype==null)
    {
        res.json({"Status":"User not logged in"});
    }
    else{
        res.json(usertype);
    }
   
})


//login
router.post('/Login', async (req,res)=>{
    const Email = req.body.Email; 
    const Password = req.body.Password; 
    const Usertype = req.body.Usertype ; 
   

    const user=await UserSchema.findOne({Email,Usertype});
    console.log(user);
    if(user==null)
    {
        console.log("Not");
        res.json({"Status":"User Not Exist"});
    }
    else
    {
         
        if(await bcrypt.compare(Password,user.Password))
        {
            res.json(user);
        }
        else{
            res.json({"Status":"Wrong password"}) ; 
        }

    }
   
    


}) ;

//signup
router.post('/SignUp',async (req,res)=>{

    console.log("signup");
    const Username=req.body.Username;
    const Password=req.body.Password;
    const Email=req.body.Email;
     const Usertype=req.body.Usertype;
    const ContactNo=req.body.ContactNo;
    const Address=req.body.Address;
    const formatted = Date.now();
    const AccCreateOn = formatted;
 

    const temp=await UserSchema.find().sort({_id:-1}).limit(1);
    let Userid=10000;
    if(temp.length!=0)
    {

        Userid=(parseInt(temp[0].Userid)+1);
    }


   
    if(Username=="" || Password=="" || Email=="" || Usertype=="" || ContactNo=="" || Address=="" || Username===undefined)
    {
        res.json({"Status":"Please Enter all the values"});
    }
    else
    {
        const hash=await bcrypt.genSalt();  
        const hashed=await bcrypt.hash(Password,hash);
        const create_new_user=await UserSchema({
            "Userid":Userid,
            "Username":Username,
            "Password":hashed,
            "Email":Email,
            "Usertype":Usertype,
            "ContactNo":ContactNo,
            "Address":Address,
            "AccCreateOn":AccCreateOn
        });

        const exist=await UserSchema.findOne({Email:Email});
        if(exist!=null)
        {
            res.json({"Status":"user already exist"});
        }
        else
        {
            create_new_user.save();

            res.json(create_new_user);
            let mailDetails = {
                from: 'rameezraja3460@gmail.com',
                to: Email,
                subject: 'Successfull',
                text: 'You have successfully signedup'
            };
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
        }
    }
   


    

})

router.post('/userdets',async(req,res)=>{

const buyerid = req.body.buyerid;


const buyerdet = await UserSchema.findOne({"Userid":buyerid});

res.json({"buyer":buyerdet})

})



router.post('/sendmailtoseller',async(req,res)=>{

    const sellerid = req.body.sellerid;


    const seller = await UserSchema.findOne({"Userid":sellerid});

    const email = seller.Email;

    let mailDetails = {
        from: 'rameezraja3460@gmail.com',
        to: email,
        subject: 'Successfull',
        text: 'Payment received for a property'
    };
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });


})

module.exports = router ; 