import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

function Rankings({venue, id}){

function handleLGBTUp(){
    fetch(`/api/venues/${id}`),{
    method: "PATCH",
    headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify({lgbtq_score: venue.lgbtq_score + 1})
    }
    .then(res => res.json())
}


return(

<>
<div className='ranking'>
<button >👎</button> LGBTQ Friendliness Score: {venue.lgbtq_score} <button onClick={handleLGBTUp}>👍</button>
<br></br>
<br></br>
<button>👎</button> Safety Score: {venue.lgbtq_score} <button>👍</button>
</div>

</>

)
}


export default Rankings