import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams ,Navigate,useNavigate} from 'react-router-dom';
import "./Details.css";
export default function Details() {
  const [state,setState]=useState([]);
  const Navigate=useNavigate();
  const apiToken='6YF5GelzCHYUV1VqX4fe';
    const {id}=useParams()
    console.log(id);
    useEffect(()=>{
        axios.get(`https://the-one-api.dev/v2/character/${id}`,{ headers }).then (response=>{
        console.log("response====>",response);
        setState (response.data.docs[0])
        console.log("id",id)
      })
      },[])
      const headers ={
        Authorization: `Bearer ${apiToken}`,
      };
      const handleClose = ()=>{
        Navigate(`/`)
        
      }
  return (
    <div className='bdy'><br/>
      <div id="header">
        <div className='detl'><h1 className='detal'>Character Details</h1></div>
  
  
</div>
<div>
  
      <div class="card">
      <div class="card-body">
      <p class="card-title"><span className='align'>Character:</span>{state?.name}</p>
      <p class="card-text"><span className='align'>Name:</span>{state?.name}</p>
      <p class="card-text"><span className='align'>WikiUrl:</span>{state?.wikiUrl}</p>
      <p class="card-text"><span className='align'>Race:</span>{state?.race}</p>
      <p class="card-text"><span className='align'>Gender:</span>{state?.gender}</p>
      <p class="card-text"><span className='align'>Height:</span>{state?.wikiUrl}</p>
      <p class="card-text"><span className='align'>Hair:</span>{state?.hair}</p>
      <p class="card-text"><span className='align'>Realm:</span>{state?.realm}</p>
      <p class="card-text"><span className='align'>Birth:</span>{state?.birth}</p>
      <p class="card-text"><span className='align'>Spouse:</span>{state?.spouse}</p>
      <p class="card-text"><span className='align'>Death:</span>{state?.death}</p>
      <button class="cls" onClick={handleClose}>Close</button>
      


    
  </div>
</div>
    </div>
    </div>
  )
}

