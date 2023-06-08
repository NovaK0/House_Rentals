import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssfile/App.css';
const FourProperties = () => {

    const [userid, setUserid] = useState(sessionStorage.getItem("Useridhouserental"));
    const navigate = useNavigate();
    //Property usestate
    const [propdata, setPropdata] = useState();
    const [isprop, setisprop] = useState();
    useEffect(() => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },

        };
        const fetchprop = async () => {

            let req = await fetch("/Property/getproperty", options)
                .then(res =>
                    res.json()).then(data => {
                        if (data.Status) {
                            alert(data.Status)
                            setisprop(false);
                        }
                        else {

                            setPropdata(data);
                            setisprop(true);
                        }
                    })
        }
        fetchprop();
    }, []);


    const addtowishlist = async (prop_id) => {
        if (!userid) {
            alert("You need to login first");
        }
        else {
           const data = {
            "prop_id":prop_id,
            "userid":userid
           }
           let options = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(data)
           }
            let req = await fetch("/Property/wishlist",options)
            .then(res =>
                res.json().then(
                    d=>{
                        alert(d.Status);
                    }
                ))
        }


    }
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
            <div className='allprop'>
                {!isprop ?
                    <div class="spinner-border" role="status">
                    </div>
                    :
                    propdata.map((e) => {
                        return (



                            <div class="col-md-3" style={{ padding: "1rem" }} key={e.prop_id}>
                                <div class="card-box-a card-shadow" style={{ height: "25rem" }}>
                                    <div class="img-box-a">
                                        <img src={e.logo} alt="" class="img-a img-fluid" style={{ height: "30rem" }} />
                                    </div>
                                    <div class="card-overlay">
                                    <div className='btnzindex'>
                                    <button class="btn btn-wishlist" onClick={() => { addtowishlist(e.prop_id) }} id="button2">
        <svg width="56px"
             height="48px"
             version="1.1"
             xmlns="https://www.w3.org/200/svg">
            <path d="M 0 0
                   L 56 0
                   L 40 48
                   L 0 48"
                   stroke="none">
            </path>
        </svg>
        <div class="icon">
            <i class="fa fa-heart"></i>
        </div>
        <div class="label">
            <span class="label-text">
                Add To Wishlist
            </span>
        </div>
                                    </button>
                                 
                                            {/* <button type='button' id='wishlistbutton' style={{border: "none",background:"none" ,padding: "2.5px",marginLeft:"790%" }} onClick={() => { addtowishlist(e.prop_id) }}><svg id="heartsvg"></svg></button> */}
                                        </div>
                                        <div class="card-overlay-a-content">
                                       
                                            <div class="card-header-a">
                                                <h2 class="card-title-a" style={{marginLeft:""}}>
                                                    <a>{e.pname}
                                                    </a>
                                                </h2>
                                            </div>
                                            <div class="card-body-a">
                                                <div class="price-box d-flex">
                                                {e.adtype==="Rent"?
                     <span class="price-a">Rs {e.rent}/month</span>
                     :
                     <>
                     <span class="price-a">Buy Rs {e.rent}</span>
                     </>
                    }
                                                </div>
                                                <div> <button type="button" className="btn btn-outline-primary" onClick={() => { openpropdetails(e.prop_id) }}>Explore</button></div>

                                            </div>
                                            <div class="card-footer-a">
                                                <ul class="card-info d-flex justify-content-around">

                                                    <li>
                                                        <h4 class="card-info-title">BHK</h4>
                                                        <span>{e.ptype}</span>
                                                    </li>
                                                    <li>
                                                        <h4 class="card-info-title">Baths</h4>
                                                        <span>{e.nobathroom}</span>
                                                    </li>
                                                    <li>
                                                        <h4 class="card-info-title">Furnishing</h4>
                                                        <span>{e.furnishing}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                }

            </div>

        </>
    )
}

export default FourProperties