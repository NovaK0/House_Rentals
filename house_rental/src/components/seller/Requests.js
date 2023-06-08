import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../Navbar';



const Requests = () => {
  const [propdata, setPropdata] = useState();
  const [userid, setuserid] = useState(sessionStorage.getItem("Useridhouserental"));
  
  const getData= async()=>{
   
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ "userid": userid })
      }
     
        let req = await fetch('/Request/getreq', options)
          .then(res =>
            res.json().
              then(data => {
                if (data.Status == "Noreq") {
                  setPropdata(undefined);
                  console.log("In fetch reqif");
                }
                else {
                  console.log("In fetch req");
                  setPropdata(data.data);
                }
    
              }))
    }



  useEffect(() => {
    getData();

  }, [])



  const updateDate = async (prop_id, Userid) => {
    
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ "prop_id": prop_id,"buyerid":Userid })
    }
   
     
      let req = await fetch('/Request/mark-request', options)
        .then(res =>
          res.json().
            then(data => {
              if (data.Status == "Request Accepted!") {
                alert("Request Accepted....");
                getData();
             
              }
              else {

                alert("Error occured....");
              }

            }))
    


  }
  

  const deleteData = async (prop_id, Userid) => {
   
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ "prop_id": prop_id,"buyerid":Userid })
    }
    
    
      let req = await fetch('/Request/delete-request', options)
        .then(res =>
          res.json().
            then(data => {
            
              if (data.Status == "Request Rejected!") {
                alert("Request Rejected....");
                getData();
              
              }
              else {

                alert("Error occured....");
              }

            }))
    
  }



 

  return (
    <>
      <Navbar />
  



{propdata?

      <div class="containerr">
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-1">S.No</div>
            <div class="col col-2">Property Name</div>
            <div class="col col-3">Buyer Name</div>
            <div class="col col-4">Accept</div>
            <div class="col col-5">Reject</div>
          </li>
          {
            propdata ?
              propdata.map((e, index) => {

                return (
                  <>

                    <li class="table-row">
                      <div class="col col-1" data-label="Prop Id">{index}</div>
                      <div class="col col-2" data-label="Property Name">{e.property.pname}</div>
                      <div class="col col-3" data-label="Buyer Name">
                        {e.user.Username}
                      </div>
                      <div class="col col-4" data-label="Accept"><button type="button" class="btn btn-success" style={{ borderRadius: "50%" }} onClick={() => updateDate(e.property.prop_id, e.user.Userid)}><i class="fa-solid fa-check"></i></button></div>
                      <div class="col col-4" data-label="Reject"><button type="button" class="btn btn-danger" style={{ borderRadius: "50%" }}  onClick={() => deleteData(e.property.prop_id, e.user.Userid)}><i class="fa-solid fa-xmark"></i></button></div>
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

export default Requests;