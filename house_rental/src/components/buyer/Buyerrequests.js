import React, { useState,useEffect } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
const Buyerrequests = () => {
    const [userid,setuserid]=useState(sessionStorage.getItem("Useridhouserental"));
    const [reqs,setreqs] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({"userid":userid})
  };
  const fetchreq=async()=>{
    let req = fetch('Request/buyerrequest',options)
    .then(res=>
        res.json())
        .then(d=>{
            if(d.Status)
            {
                alert("There is no request from your end");
            }
            else{
                setreqs(d.data);
            }
        })
  }
  fetchreq();
    },[])

    const openpropdetails=async(prop_id)=>{
      if(!userid)
      {
       alert("You need to login first");
      }
      else{
        navigate('../PropertyDescription', {state:{"id":prop_id}}); 
      }
     }
  
console.log(reqs);
  return (
  <>
  <Navbar/>
 
   {reqs?

<div class="containerr">
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-41">S.No</div>
      <div class="col col-42">Property Name</div>
      <div class="col col-43">Owner Name</div>
      <div class="col col-44">Status</div>
      <div class="col col-45">&nbsp;</div>
    </li>
    {
      reqs ?
        reqs.map((e, index) => {

          return (
            <>

              <li class="table-row">
                <div class="col col-31" data-label="Prop Id">{index+1}</div>
                <div class="col col-32" data-label="Property Name">{e.property.pname}</div>
                <div class="col col-33" data-label="Owner Name">
                  {e.user.Username}
                </div>
                <div class="col col-34" data-label="Status">{e.req.stat}</div>
                <div class="col col-35" data-label="View"><button type="button" class="btn btn-primary" onClick={() => { openpropdetails(e.property.prop_id) }}>View</button></div>
              </li>

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

export default Buyerrequests;