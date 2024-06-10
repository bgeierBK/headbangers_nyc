import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'
import Rankings from '../components/Rankings'

function VenuePage(){
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [venue, setVenue] = useState(null)
    const [reviewText, setReviewText] = useState('')
    const [reviews, setReviews] = useState('')
    const { currentUser, setCurrentUser } = useOutletContext();
    const [headliner, setHeadliner] = useState('')
    const [openers, setOpeners] = useState('')
    const [date, setDate] = useState('')
    
    
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
            setReviews(data.reviews)
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


function handleReviewSubmit(event){
    event.preventDefault();
    const itemData ={
        review_content: reviewText,
        venue_id: venue.id,
        user_id: currentUser.id
    }
    fetch('/api/reviews', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",

        },
        body: JSON.stringify(itemData)
    })
    .then(response => response.json())
    .then(newReview =>{
        setReviews(prevReviews =>[...prevReviews, newReview])
        setReviewText('');
    })
    .catch(error =>{
        setError(error);
    })
}

function handleEventSubmit(event){
    event.preventDefault();
    const itemData ={
        headliner: headliner,
        opening_acts: openers,
        date: date,
        venue_id: venue.id,
        user_id: currentUser.id
    }
    fetch('/api/events', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",

        },
        body: JSON.stringify(itemData)
    })

    
}
    
    return(
       <>
        <h2>Venue Page</h2>
        <h3>{venue.name}</h3>
        <br></br>
        <br></br>
        <Rankings key ={venue.id} venue={venue}/>
        <div className='reviews'>
            {reviews.map(review =>(
                <ReviewCard key={review.id} review={review} id={id} />
            ))}
        </div>

        <form onSubmit={handleReviewSubmit}>
            <label>Share Your Review</label>
            <textarea 
            name='review_content'
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder = "Write a review!"
            required
            />
            <button type="submit">Submit Review</button>
        </form>

        <br></br>
        <br></br>
        <br></br>

        <form onSubmit={handleEventSubmit}>
        <label className='label' htmlFor="name">Headliner</label>
            <input 
            name='headliner'
            placeholder='headliner'
            value={headliner}
            onChange={(e) => setHeadliner(e.target.value)}
            />
            <label className='label' htmlFor="name">Opening Acts</label>
            <input 
            name='opening_acts'
            placeholder='Opening Acts'
            value={openers}
            onChange={(e) => setOpeners(e.target.value)}
            />
            <label className='label' htmlFor="name">Date</label>
            <input 
            type='date'
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit">Create Event</button>
        </form>

        <br></br>

        </>
    )
}

export default VenuePage