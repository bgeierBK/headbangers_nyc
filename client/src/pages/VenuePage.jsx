import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'
import Modal from '../components/Modal'
import PhotoCard from '../components/PhotoCard'

function VenuePage(){
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [venue, setVenue] = useState(null)
    const [reviewText, setReviewText] = useState('')
    const [reviews, setReviews] = useState([])
    const { currentUser, setCurrentUser } = useOutletContext();
    const [headliner, setHeadliner] = useState('')
    const [openers, setOpeners] = useState('')
    const [date, setDate] = useState('')
    const [stars, setStars] = useState(null)
    const [file, setFile] = useState(null)
    const [photos, setPhotos] = useState([])
    const [message, setMessage]= useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [lgbtqUpClicked, setLgbtqUpClicked] = useState(false)
    const [lgbtqDownClicked, setLgbtqDownClicked] = useState(false)
    const [safetyUpClicked, setSafetyUpClicked] = useState(false)
    const [safetyDownClicked, setSafetyDownClicked] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [showEventModal, setShowEventModal] = useState(false)
    
    
    useEffect(() =>{
        if (loading){
        fetch(`/api/venues/${id}`)
        .then(response =>{
            if (!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        .then((data) =>{
            setVenue(data);
            setReviews(data.reviews || [])
            setPhotos(data.photos || [])
            console.log(data.photos)
            console.log(data)
            setLoading(false);
        })
        .catch((error) =>{
            setError(error);
            setLoading(false)
        })
}
}, [id, venue, loading])
console.log(reviews)



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
    setShowEventModal(false)

    
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
        setLoading(true)
        setLgbtqUpClicked(true)
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
            setLoading(true)
            setLgbtqDownClicked(true)
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
                setLoading(true)
                setSafetyDownClicked(true)
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
                    setLoading(true)
                    setSafetyUpClicked(true)
                })
                .catch(error => {
                    console.error('Error:', error)
                })
                }

                const handlePhotoSubmit = async (e) =>{
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', 'm4excn2y');
                    
                    try{
                        const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dxtkrqdmo/image/upload',{
                        method: 'POST',
                        body: formData
                        });
                        if (!cloudinaryResponse.ok){
                            throw new Error('Failed to upload photo to Cloudinary')
                        }
                    const cloudinaryResult = await cloudinaryResponse.json();
                    const photoUrl = cloudinaryResult.secure_url;
                
                    const backendResponse = await fetch ('/api/photos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            file: photoUrl,
                            venue_id: venue.id,
                        })
                    });
                    if (!backendResponse.ok){
                        throw new Error('Failed to upload photo to backend');
                    }
                    const result = await backendResponse.json();
                    setMessage('Photo uploaded successfully');
                    console.log('Photo uploaded successfully', result);
                    setPhotos([...photos, result])
                    } catch (error){
                        setMessage('Error uploading photo');
                        console.error('Error ploading photo', error)
                    }
                }
                
                
                const openModal = (photo) => {
                    setSelectedPhoto(photo);
                    setIsOpen(true)
                }
                
                const closeModal = () =>{
                    setIsOpen(false);
                    setSelectedPhoto(null)
                }

                function handleFileChange(event){
                    setFile(event.target.files[0])
                }
                const mappedPhotos = photos.map(photo => (
                    <div key={photo.id} className='relative overflow-hidden' onClick={() => openModal(photo)}>
                        <PhotoCard photo={photo}/>
                    </div>
                   ))
                
                const mappedReviews = reviews.map(review =>(
                    <ReviewCard key={review.id} review={review} id={id} />
                ))
    
    const openEventModal = () =>{
        setShowEventModal(true)
    }

    const closeEventModal = () =>{
        setShowEventModal(false)
    }
    
    return(
       <div className='bg-neutral-200'>
       <div className='bg-neutral-200'>
        <h3 className='text-7xl font-bungee'><a href={venue.website} target='_blank' rel='noopener noreferrer'>{venue.name}</a></h3>
        <h4 className='text-xl'>{venue.address}</h4>
       
        <br></br>
        <br></br>
<div className='space-y-2 ml-4'>

<button>Add Review</button>
<br></br>
<button
className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
onClick={openEventModal}
>Add Event</button>
<br></br>

<button onClick={handleLGBTDown} disabled={lgbtqDownClicked} >👎</button> LGBTQ Friendliness Score: {venue.lgbtq_score} <button onClick={handleLGBTUp} disabled={lgbtqUpClicked}>👍</button>
<br></br>

<button onClick={handleSafetyDown} disabled={safetyDownClicked}>👎</button> Safety Score: {venue.safety_score} <button onClick={handleSafetyUp} disabled={safetyUpClicked}>👍</button>
<br></br>
<p><strong>Reviews:</strong></p>
<br></br>
</div>

        <div className='space-y-2 ml-4'>
            {mappedReviews}
        </div>
        <br></br>
        <div className='grid grid-cols-5 gap-4'>
            {photos.map(photo =>(
                <div key={photo.id} className='relative overflow-hidden' onClick={() => openModal(photo)}>
                <PhotoCard  photo={photo} id={id} />
                </div>
            ))}
        </div>
       
        <br></br>
        <div className='flex flex-col space-y-4'>
        <form className='flex flex-col space-y-4' onSubmit={handleReviewSubmit}>
            <label className='block'>Share Your Review</label>
            <textarea
            className='block w-full h-40 p-2 border rounded-md'
            name='review_content'
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder = "Write a review!"
            required
            />
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600' type="submit">Submit Review</button>
        </form>
        </div>
        

        <h5>Add a photo for this venue:</h5>
        <form onSubmit={handlePhotoSubmit}>
            <label>Choose file:
                <input type="file" onChange={handleFileChange} required></input>
            </label>
            <button  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600' type="submit">Upload Photo</button>
        </form>
        {isOpen && (
            <Modal photo={selectedPhoto} closeModal={closeModal} />
        )}


        <br></br>
        <br></br>
        <br></br>

        
        
        {showEventModal &&(
            <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                <div className='bg-white p-8 rounded-lg z-10'>
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
                <button 
                type="submit"
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={closeModal}
                >Create Event</button>
            </form>

                </div>

            </div>
    
        )}
        <br></br>

        </div>
        </div>
        
    )
}

export default VenuePage