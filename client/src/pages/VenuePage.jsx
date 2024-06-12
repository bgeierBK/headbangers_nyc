import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'

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
    const [stars, setStars] = useState(null)
    
    
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
    }, [id, venue])


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
function handleLGBTUp(){
    fetch(`/api/venues/${id}`,{
    method: "PATCH",
    headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify({lgbtq_score: venue.lgbtq_score + 1})
    })
    .then(response =>{
        if (!response.ok){
            throw new Error('Failed to update')
        }
        return response.json()
    })
    .then (updatedVenue =>{
        console.log('Update successful', updatedVenue)
    })
    .catch(error => {
        console.error('Error:', error)
    })
    }

    function handleLGBTDown(){
        fetch(`/api/venues/${id}`,{
        method: "PATCH",
        headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({lgbtq_score: venue.lgbtq_score - 1})
        })
        .then(response =>{
            if (!response.ok){
                throw new Error('Failed to update')
            }
            return response.json()
        })
        .then (updatedVenue =>{
            console.log('Update successful', updatedVenue)
        })
        .catch(error => {
            console.error('Error:', error)
        })
        }

        function handleSafetyDown(){
            fetch(`/api/venues/${id}`,{
            method: "PATCH",
            headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({safety_score: venue.safety_score - 1})
            })
            .then(response =>{
                if (!response.ok){
                    throw new Error('Failed to update')
                }
                return response.json()
            })
            .then (updatedVenue =>{
                console.log('Update successful', updatedVenue)
            })
            .catch(error => {
                console.error('Error:', error)
            })
            }
        
            function handleSafetyUp(){
                fetch(`/api/venues/${id}`,{
                method: "PATCH",
                headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({safety_score: venue.safety_score + 1})
                })
                .then(response =>{
                    if (!response.ok){
                        throw new Error('Failed to update')
                    }
                    return response.json()
                })
                .then (updatedVenue =>{
                    console.log('Update successful', updatedVenue)
                })
                .catch(error => {
                    console.error('Error:', error)
                })
                }
    
    return(
       <div className='bg-neutral-200'>
       <div className='bg-neutral-200'>
        <h2>Venue Page</h2>
        <h3>{venue.name}</h3>
        <br></br>
        <br></br>
        <div className='ranking'>
<button onClick={handleLGBTDown} >👎</button> LGBTQ Friendliness Score: {venue.lgbtq_score} <button onClick={handleLGBTUp}>👍</button>
<br></br>
<br></br>
<button onClick={handleSafetyDown}>👎</button> Safety Score: {venue.safety_score} <button onClick={handleSafetyUp}>👍</button>
</div>
        <div className='space-y-2'>
            {reviews.map(review =>(
                <ReviewCard key={review.id} review={review} id={id} />
            ))}
        </div>
        
        <div className='flex flex-col space-y-4'>
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
        </div>



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

        </div>
        </div>
    )
}

export default VenuePage