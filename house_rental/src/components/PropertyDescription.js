import React from 'react';
import Navbar from './Navbar';
import { useState, useEffect,useRef  } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLocation } from 'react-router-dom';
import Propimg from './Propimg';
import BingMapsReact from "bingmaps-react";

import axios from "axios";
const PropertyDescription = () => {
  const mapRef = useRef(null);
  const location = useLocation();
  const [sellerid,setsellerid] = useState();
  const [pdf,setpdf] = useState();
  const [refreshh, setrefresh] = useState(false);
  const [userid, setUserid] = useState(sessionStorage.getItem("Useridhouserental"));
  const [prop_id, setPropid] = useState(location.state.id);
  const [propdet, setpropdet] = useState();
  const [propname, setprop] = useState();
  const [lat, setlat] = useState();
  const [long, setlong] = useState();
  const [hospital, sethos] = useState();
  const [bus, setbus] = useState();
  const [train, settrain] = useState();
  const [police, setpolice] = useState();
  const [accept, setacc] = useState();
  const [pay, setpay] = useState();
  const [checkdep, setdep] = useState(false);
  const [payid, setpayid] = useState();
  const [lastpay, setlastpay] = useState();
  const [nextpay, setnextpay] = useState();
  const [checkd, setcheckd] = useState(0);
  const [refre,setrefre] = useState(false);
  const [usertype, setType] = useState();

 


  useEffect(() => {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ "prop_id": prop_id })
    };

    fetch('Property/getsingleprop', options)
      .then(res =>
        res.json()).
      then(data => {
        setpropdet(data.props);
        setprop(data.props[0].pname);
        setsellerid(data.props[0].userid);
       fetchhos(data.point.lat, data.point.long);
       fetchpolice(data.point.lat, data.point.long);
       setlat(data.point.lat);
       setlong(data.point.long);
       
       
      })


  }, [refre])

  


  useEffect(() => {
    const data = {
      "prop_id": prop_id,
      "buyerid": userid
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    };

    const fetchrec = async () => {
      const req = await fetch('/Request/checkstat', options)
        .then(res =>
          res.json())
        .then(d => {
          if (d.Status) {

          }
          else {
            setacc(d);
          }
        })
    }
    fetchrec();

  }, [])

  const requestcontact = (prop_id) => {

    if (!userid) {
      alert("You need to login first");
    }
    else {
      const data = {
        prop_id: prop_id,
        userid: userid
      }
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      }
     
      let req = fetch("/Request/request", options)
        .then(res =>
          res.json().then(data => {
            alert(data.Status);
          }))
    }


  }

  const [userdets,setuserdets] = useState();

  useEffect(()=>{
    const fetchtype =async() =>{
      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({"userid":userid})
    
    };
      let req = await fetch('/User/gettype',options)
    .then(res =>
      res.json().
      then(data=>{
        if(data.status)
        {
         
        }
        else{
        
          setType(data[0].Usertype);
        }
       
      }))
    }
    fetchtype();
    },[]);





  const checkdepo = async () => {

    const data = {
      "prop_id": prop_id,
      "buyerid": userid,
    }

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    };

    let req = await fetch('/api/payment/checkfordepo', options)
      .then(res =>
        res.json())
      .then(d => {

        if (d.Status) {
          setdep(true);
        }
        else {
          var temp = d.paymentdate.slice(0, 10);
          var tempdate = new Date(temp);
          var date = new Date(tempdate.getFullYear(), tempdate.getMonth(), tempdate.getDate());
          var date2 = new Date(tempdate.getFullYear(), tempdate.getMonth() + 1, tempdate.getDate());
          setlastpay(date);
          setnextpay(date2);
          setdep(false);
          if (date2 > date) {
            setcheckd(true);
          }

        }
      })
  }
  useEffect(() => {
    checkdepo();
  }, [refreshh])

  const initPayment = (data) => {
    const options = {
      key: process.env.KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: propdet[0].pname,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          setpay(data);
          setrefresh(refreshh + 1);
          storepayment();
          setstatus(propdet[0].prop_id);
          generateBill();
          sendmail();

        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#00D100",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();


 

  };



  const sendmail=async()=>{
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({"sellerid":sellerid})
    };

    let req = await fetch('User/sendmailtoseller',options)
    .then(res=>res.json())
    .then(d=>{
      
    })

  }

  const generateBill=async()=>
  {
 
    var data = {
      "images": {
        "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
        "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
      },
      "sender": {
        "company": "House Rentals",
        "address": "Rajkot",
        "zip": "380006",
        "city": "Rajkot",
        "country": "India"
      },
      "client": {
        "company": userdets.Username,
        "address": userdets.address,
        "zip": propdet[0].pincode,
        "city": propdet[0].city,
        "country": "India"
      },
      "information": {
        "number": Math.random(100000),
        "date": "2023-04-28",
        "due-date": "2023-05-27"
      },
      "products": [
        {
          "quantity": "1",
          "description": propdet[0].pname,
          "tax-rate": 0,
          "price": parseInt(propdet[0].rent)
        }
      ],
      "bottom-notice": "Deposit or advanced payment is not mentioned here",
      "settings": {
        "currency": "INR",
        "tax-notation": "vat",
        "margin-top": 25,
        "margin-right": 25,
        "margin-left": 25,
        "margin-bottom": 25
      }
    }
    
    

  
  
  let options = {
    method: 'POST',
    headers: {
  
      'Content-Type': 'application/json;charset=utf-8'
    },
    body:JSON.stringify({data:data})
  }
  let req = await fetch("https://api.easyinvoice.cloud/v2/free/invoices", options);
  let res = await req.json();
  setpdf(res.data.pdf);

  var pdfasDataUri = "data:application/pdf;base64,"+res.data.pdf;
  window.open(pdfasDataUri);
 
  
}








  const setstatus=(prop_id)=>{

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({"prop_id":prop_id})
    };
    let req = fetch("/Property/setstatus",options)
    .then(res=>res.json())
    .then(d=>{
      setrefre(!refre);
      alert("Property Booked Successfully");
    })

  }

  const vacateprop = async (prop_id)=>{
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({"prop_id":prop_id})
    };
    let req = fetch("/Property/setvacatestatus",options)
    .then(res=>res.json())
    .then(d=>{
      alert("Property Left");
    })

    const options1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ "prop_id": prop_id,"buyerid":userid })
    }
    
    let reqq = await fetch('/Request/delete-request', options1)
    .then(res =>
      res.json().
        then(data => {
        
          if (data.Status == "Request Rejected!") {
            setrefre(!refre);
          
          
          }
          else {

            alert("Error occured....");
          }

        }))
        
    

  }



  const handlePayment = async () => {
    if (checkdep && propdet.adtype==="Rent" ) {
      try {
        const orderUrl = "/api/payment/orders";
        const { data } = await axios.post(orderUrl, { amount: parseInt(propdet[0].rent + propdet[0].deposit) });
        setpayid(data.data.id);
        initPayment(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    else if(propdet[0].adtype==="Sell")
    {
      try {
        const orderUrl = "/api/payment/orders";
        const { data } = await axios.post(orderUrl, { amount: parseInt(propdet[0].rent) });
        setpayid(data.data.id);
        initPayment(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    else {

      try {
        const orderUrl = "/api/payment/orders";
        const { data } = await axios.post(orderUrl, { amount: parseInt(propdet[0].rent) +  parseInt(propdet[0].deposit) });
        setpayid(data.data.id);
        initPayment(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const storepayment = async () => {

    const data = {
      "prop_id": propdet[0].prop_id,
      "sellerid": propdet[0].userid,
      "buyerid": userid,
      "amount": propdet[0].rent,
      "duration": "1 month",
      "paymentid": payid
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    };
    let req = await fetch('/api/payment/storepayment', options)
      .then(res =>
        res.json())
      .then(d => {
        if (d.Status) {

        }
        else {
          alert("Payment Successfull");
        }
      })
  }

  const options00 = {
    
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_key,
      'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
    }
  };
  const fetchhos = async (lat, long) => {
    const url = "https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=" + lat + "%2C" + long + "&type=hospital&radius=5000&language=en"
   
    const req = await fetch(url, options00).then(res=>res.json())
    .then(data=>sethos(data.results[0]));
  } 

    
  
  
  const fetchpolice=async(lat,long)=>{
    const url = "https://trueway-places.p.rapidapi.com/FindPlacesNearby?location="+lat+"%2C"+long+"&type=police_station&radius=10000&language=en"
 
     const req =await fetch(url, options00).then(res=>res.json())
     .then(data=>setpolice(data.results[0]));
     

    };

    useEffect(()=>{

     
        let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({"buyerid":userid})
        }
      const fetchdets=async()=>{
      
        let req = await fetch('/User/userdets',options)
        .then(res=>res.json())
        .then(d=>{
          setuserdets(d.buyer);
        })
      }
      fetchdets();
    
      

    
    },[])

   



  return (
    <>
      <Navbar />
      <div style={{ marginTop: "8rem", marginLeft: "42.5%", fontFamily: "poppins", fontSize: "1.5rem", color: "black", fontWeight: "600" }}>{propname}</div>

      <Propimg prop_id={prop_id} />
      {propdet?
      <>
      {propdet[0].adtype=="Rent"?
      <>
      {accept ?
        <>
          {
            lastpay && checkd ?
              <>
                <div style={{ marginTop: "20rem", marginLeft: "40%" }}>
                  <h4>Payment done till {nextpay.toString().slice(0, 10)}</h4>
                </div>
              </> :
              <>
                <div style={{ marginTop: "20rem", marginLeft: "40%" }}>
                  <button type="button" class="btn btn-primary" onClick={() => { handlePayment(prop_id) }}>Pay</button>
                </div>
                <div style={{marginTop: "-2.25rem",marginLeft: "50%" }}>
                  <button type="button" class="btn btn-primary" onClick={() => { vacateprop(prop_id) }}>Vacate</button>
                </div>
              </>
          }
        </>
        :
        <div style={{ marginTop: "30rem", marginLeft: "42.5%" }}>
          {usertype==="Buyer"?
           <button type="button" class="btn btn-primary" onClick={() => { requestcontact(prop_id) }}>Request Contact</button>:
           <div></div>
          
          }
          
        </div>

      }
      <h3 style={{ marginTop: "1rem", marginLeft: "42.5%" }}>Property Details</h3>
      <div className='mainbox1'>
        {!propdet ?
          <div>
          </div>
          :

          propdet.map((e) => {
            return (
              <>
                <table class="table table-bordered table-striped table-hover" style={{ width: "60%" }} >
                  <tbody>
                    <tr>

                      <td style={{ width: "60%" }}>Property name</td>
                      <td >{e.pname}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>BHK</td>
                      <td>{e.ptype}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Rent</td>
                      <td>Rs {e.rent}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Deposit</td>
                      <td>{e.deposit}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Maintanance Included</td>
                      <td>{e.maintainance}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Parking area</td>
                      <td>{e.parea}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Property area</td>
                      <td>{e.proparea} sqft</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Furnishing</td>
                      <td>{e.furnishing}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Bathrooms</td>
                      <td>{e.nobathroom}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Preferred Tennants</td>
                      <td>{e.ptennants}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>City</td>
                      <td>{e.city}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Pincode</td>
                      <td>{e.pincode}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Available From</td>
                      <td>{e.availfrom.toString().slice(0, 10)}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Nearest Hospital</td>
                      {hospital? 
                      <td>{hospital.name}, {hospital.distance} metres</td>:
                      <td></td>
                      }
                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Police Station</td>
                      {police?
                       <td>{police.name}, {police.distance} metres</td>
                       :
                       <td></td>
                    
                    }
                       

                    </tr>
                   

                  </tbody>
                </table>
              </>
            )
          })
        }
      </div>
      </>
      :
      <>
      {accept ?
        <>
          {
            lastpay?
              <>
                <div style={{ marginTop: "20rem", marginLeft: "40%" }}>
                <a href = {pdf}>Payment Done</a>
                 
                  
                </div>
              </> :
              <>
                <div style={{ marginTop: "25rem", marginLeft: "40%" }}>
                  <button type="button" class="btn btn-primary" onClick={() => { handlePayment(prop_id) }}>Pay</button>
                </div>
                <div style={{marginTop: "-2.25rem",marginLeft: "50%" }}>
                  <button type="button" class="btn btn-primary" onClick={() => { vacateprop(prop_id) }}>Vacate</button>
                </div>
              </>
          }
        </>
        :
        <div style={{ marginTop: "20rem", marginLeft: "42.5%" }}>
          <button type="button" class="btn btn-primary" onClick={() => { requestcontact(prop_id) }}>Request Contact</button>
        </div>

      }
      <h3 style={{ marginTop: "1rem", marginLeft: "42.5%" }}>Property Details</h3>
      <div className='mainbox1'>
        {!propdet ?
          <div>
          </div>
          :

          propdet.map((e) => {
            return (
              <>
                <table class="table table-bordered table-striped table-hover" style={{ width: "60%" }} >
                  <tbody>
                    <tr>

                      <td style={{ width: "60%" }}>Property name</td>
                      <td >{e.pname}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>BHK</td>
                      <td>{e.ptype}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>BuyOut Price</td>
                      <td>Rs {e.rent}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Advanced</td>
                      <td>{e.deposit}</td>

                    </tr>
                   
                    <tr>

                      <td style={{ width: "60%" }}>Parking area</td>
                      <td>{e.parea}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Property area</td>
                      <td>{e.proparea} sqft</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Furnishing</td>
                      <td>{e.furnishing}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Bathrooms</td>
                      <td>{e.nobathroom}</td>

                    </tr>
                   
                    <tr>

                      <td style={{ width: "60%" }}>City</td>
                      <td>{e.city}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Pincode</td>
                      <td>{e.pincode}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Available From</td>
                      <td>{e.availfrom.toString().slice(0, 10)}</td>

                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Nearest Hospital</td>
                      {hospital? 
                      <td>{hospital.name}, {hospital.distance} metres</td>:
                      <td></td>
                      }
                    </tr>
                    <tr>

                      <td style={{ width: "60%" }}>Police Station</td>
                      {police?
                       <td>{police.name}, {police.distance} metres</td>
                       :
                       <td></td>
                    
                    }
                       

                    </tr>
                   

                  </tbody>
                </table>
              </>
            )
          })
        }
      </div>
      </>
      
}
</>
:
<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
}
{
  !lat && !long?
 
    
    <h3 style={{marginLeft:"10rem"}}>Loading</h3>
    :
    <div  style={{marginLeft:"20rem"}}>
    <BingMapsReact 
    bingMapsKey="At7iOBhe6_JXsV5GohqJEiuZsmYxNLfDU2ZB03w2bPPXsYBXsrb-vkAZyW-39I2H"
    height="500px"
    mapOptions={{
      navigationBarMode: "square",
    }}
    width="1000px"
    
    viewOptions={{
      center: {latitude: Number(lat), longitude: Number(long) },
      mapTypeId: "grayscale",
      zoom:14
    }}
  />
</div>
}



    </>

  )
}

export default PropertyDescription;