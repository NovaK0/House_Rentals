import React from 'react'
import { useState,useEffect } from 'react';
import Navbar from '../Navbar';

import { useNavigate } from 'react-router-dom';
const Ownedproperty = () => {
  const navigate = useNavigate();
    const [propdata, setPropdata] = useState();
    const [lastpay,setlastpay] = useState();
    const [nextpay,setnextpay] = useState();
    const [userid,setUserid]=useState(sessionStorage.getItem("Useridhouserental"));

    const getData= async()=>{
   
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ "buyerid": userid })
        }
       
          let req = await fetch('/api/payment//ownedproperty', options)
            .then(res =>
              res.json().
                then(data => {
                  if (data.Status == "Noreq") {
                    setPropdata(undefined);
                    console.log("In fetch reqif");
                  }
                  else {
                    console.log(data.data);
                    setPropdata(data.data);
                  }
      
                }))
      }
  
  
  
    useEffect(() => {
      getData();
  
    }, [])


    const openpropdetails=async(prop_id)=>{
      if(!userid)
      {
       alert("You need to login first");
      }
      else{
        navigate('../PropertyDescription', {state:{"id":prop_id}}); 
      }
     }


  return (
    <>
    <Navbar/>

    {propdata?

<div class="containerr">
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-21">S.No</div>
      <div class="col col-22">Property Name</div>
      <div class="col col-23">Posted By</div>
      <div class="col col-24">Payment date</div>
      <div class="col col-25">Next payment</div>
      
    </li>
    {
      propdata ?
        propdata.map((e, index) => {

          return (
            <>

              <li class="table-row">
                <div class="col col-21" data-label="Prop Id">{index+1}</div>
                <div class="col col-22" data-label="Property Name"><button type="button" class="btn btn-success" onClick={() => { openpropdetails(e.propdet[0].prop_id) }}>{e.propdet[0].pname}</button></div>

                <div class="col col-23" data-label="Posted By">
                 {
                    e.userinfo[0].Username
                 }
                </div>
                <div class="col col-24" data-label="Payment date">{e.lastdate.toString().slice(0,10)}</div>
                <div class="col col-25" data-label="Next payment">{e.nextdate.toString().slice(0,10)}</div>
              </li>
                {/* <div class="col col-26" data-label="View"><button type="button" class="btn btn-primary" onClick={() => { openpropdetails(e.propdet.prop_id) }}>View</button></div> */}

            </>
          )
        })
        :
        <div></div>
    }
  </ul>
</div>

:
<div class="card text-white bg-info mb-3" style={{maxWidth: "18rem",marginTop:"10rem",marginLeft:"45%"}}>
<div class="card-header">Requests</div>
<div class="card-body">
<h5 class="card-title">No Pending Requests</h5>
<p class="card-text">You don't have any pending request right now.</p>
</div>
</div>
} 



    
    
    
    </>
  )
}

export default Ownedproperty;