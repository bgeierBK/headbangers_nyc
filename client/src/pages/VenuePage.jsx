import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'

function VenuePage(){
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [venue, setVenue] = useState(null)
    
    useEffect(() =>{
        fetch(`/api/venues/${id}`)
        .then(response =>{
            if (!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        .then((data) =>{
            setVenue(data);
            setLoading(false);
        })
        .catch((error) =>{
            setError(error);
            setLoading(false)
        })
    }, [id])


if (loading){
    return <div>Loading...</div>
}

if (error){
    return <div>Error: {error.message}</div>
}
    
    return(
       <>
        <h2>Venue Page</h2>
        <h3>{venue.name}</h3>
        <div className='reviews'>
            {venue.reviews.map(review =>(
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
        </>
    )
}

export default VenuePage