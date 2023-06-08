const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const PropertySchema = require("../models/PropertySchema");
const PaymentSchema = require("../models/PaymentSchema");
const UserSchema = require("../models/UserSchema");
const fs = require('fs');
router.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error)
;
	}
});

router.post('/storepayment',async(req,res)=>{
	
    const prop_id=req.body.prop_id;
    const buyerid=req.body.buyerid;
    const sellerid=req.body.sellerid;
    const duration=req.body.duration;
	const amount  = req.body.amount;
    const formatted = Date.now();
    const paymentdate = formatted;
	const temp=await PaymentSchema.find().sort({_id:-1}).limit(1);
	let paymentid=10000;
    if(temp.length!=0)
    {
        paymentid=(parseInt(temp[0].paymentid)+1);
    }
	console.log(req.body);
	const create_new_payment=await PaymentSchema({
		"paymentid":paymentid,
		"prop_id":prop_id,
		"buyerid":buyerid,
		"sellerid":sellerid,
		"amount":amount,
		"duration":duration,
		"paymentdate":paymentdate
		
	});
	create_new_payment.save();
})

router.post("/checkfordepo",async (req,res)=>{
	console.log("Check");
	const prop_id=req.body.prop_id;
    const buyerid=req.body.buyerid;
	const exist = await PaymentSchema.find({prop_id,buyerid});
	console.log(exist);
	if(exist ===undefined || exist.length===0){
		res.json({"Status":"True"});
	}
	else{
		const recentdate = await PaymentSchema.findOne({prop_id,buyerid}).sort({_id:-1}).limit(1);
		res.json({"paymentdate":recentdate.paymentdate});
	
	}
	
})

router.post("/ownedproperty",async (req,res)=>{
    const buyerid=req.body.buyerid;
	const exist = await PaymentSchema.find({buyerid});
	if(exist ===undefined || exist.length===0){
		res.json({"Status":"You don't own any property"});
	}
	else{
		let result = []
		let propid=[]
		const data = await PaymentSchema.find({buyerid}).sort({_id:-1});
		for(let i = 0;i<data.length;i++)
		{
			propid.push(data[i].prop_id);
		}
	
		for(let j=0;j<propid.length;j++)
		{
			const propdet = await PropertySchema.find({"prop_id":propid[j]});
			
			const recentdate = await PaymentSchema.findOne({"prop_id":propid[j],"buyerid":data[j].buyerid}).sort({_id:-1}).limit(1);
			console.log(recentdate.paymentdate);
			const sellerid = await UserSchema.find({"Userid":data[j].sellerid});
			const date2 = new Date(recentdate.paymentdate.getFullYear(),recentdate.paymentdate.getMonth()+1,recentdate.paymentdate.getDate())
			console.log(sellerid);
			if(propdet===undefined || propdet.length===0)
			{
				

			}
			else{
				result.push({"propdet":propdet,"lastdate":recentdate.paymentdate,"nextdate":date2,"userinfo":sellerid});
			}

		}

		if(result.length==0 || result==undefined)
		{
		 res.json({"Status":"No owned property"});
		}
		else{
		 res.json({data:result});
		}
		
	
	}
	
})


//save pdf

router.post('/savepdf',async(req,res)=>{
	const data = req.body;
	fs.writeFile("payment.pdf", data, (err) => {
		if (err)
		  console.log(err);
		else {
		  console.log("File written successfully\n");
		}
	  });


})




module.exports = router;

