import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from '../Navbar';

const Avgcost = () => {
let len ;
const [data,setData] = useState();
const [bhk1,setbhk1] = useState();
const [bhk2,setbhk2] = useState(0);
const [bhk3,setbhk3] = useState();
const [bhk33,setbhk33] = useState();

const [bbhk1,setbbhk1] = useState();
const [bbhk2,setbbhk2] = useState();
const [bbhk3,setbbhk3] = useState();
const [bbhk33,setbbhk33] = useState();

useEffect(()=>{
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }
    const fetchavg =async()=>{
        let res = fetch('/Property/avgcost',options)
        .then(res=>
            res.json())
        .then(d=>{
            if(d.Status)
            {
                
            }
            else{
                setbhk1(d.bhk1);
                setbhk2(d.bhk2);
                setbhk3(d.bhk3);
                setbhk33(d.bhk33);

                setbbhk1(d.bbhk1);
                setbbhk2(d.bbhk2);
                setbbhk3(d.bbhk3);
                setbbhk33(d.bbhk33);
            }
        })
    }
    fetchavg();

},[])

console.log(bhk1);
  return (
 <>
<Navbar/>

<div className='avgcontainer'>
<div className='avgcontainer2'>


<table class="table table-bordered table-striped" style={{width:"20rem"}}>
<caption>Average cost for Rental Properties</caption>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">BHK</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>1 BHK</td>
      <td>{bhk1}</td>
     
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>2 BHK</td>
      <td>{bhk2}</td>
     
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>3 BHK</td>
      <td>{bhk3}</td>
     
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>3+ BHK</td>
      <td>{bhk33}</td>
     
    </tr>
  </tbody>
</table>


<table class="table table-bordered table-striped" style={{width:"20rem",marginLeft:"1rem"}}>
<caption>Average cost for Selling Properties</caption>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">BHK</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>1 BHK</td>
      <td>{bbhk1}</td>
     
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>2 BHK</td>
      <td>{bbhk2}</td>
     
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>3 BHK</td>
      <td>{bbhk3}</td>
     
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>3+ BHK</td>
      <td>{bbhk33}</td>
     
    </tr>
  </tbody>
</table>






</div>

</div>


 
 
 
 
 
 </>
  )
}

export default Avgcost;