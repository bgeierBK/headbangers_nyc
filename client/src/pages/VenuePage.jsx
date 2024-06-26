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
    const [showClaimModal, setShowClaimModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [venueID, setVenueID] = useState(null)
    const [venueData, setVenueData]= useState({
        name: '',
        address: '',
        website: ''})

    

    
    function handleVenueEdit(event){
        event.preventDefault()
        const updatedData = {}

        for (let key in venueData){
            if (venueData[key]){
                updatedData[key] = venueData[key]
            }
        }

        fetch(`/api/venues/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        })
        .then(response =>{
            if (!response.ok){
                throw new Error('failed to update venue')
            }
            return response.json()
        })
        .then(updatedVenue =>{
            console.log('venue successfully updated', updatedVenue)
            closeEditModal()
            window.location.reload();
        })
        .catch(error =>{
            console.error('errir updating venue', error)
        })
    }
        
    function handleVenueChange(e){
        const {name, value} = e.target;
        setVenueData(prevState =>({
            ...prevState,
            [name]: value
        }))
    }

    
    function handleMultipleClicks(...functions){
        return() =>{
            functions.forEach(func => func())
        }
    }

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
            setLoading(false);
            setVenueID(data.owner_user_id)
        })
        .catch((error) =>{
            setError(error);
            setLoading(false)
        })
}
}, [id, venue, loading])




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
        setShowReviewModal(false)
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

            function claimVenue(){
                if (!id || !currentUser || !currentUser.id){
                    console.error('invalid id or user', {id, currentUser})
                }
                
                
                fetch(`/api/venues/${id}`, {
                    method: 'PATCH',
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                        },
                    body: JSON.stringify({owner_user_id: currentUser.id})
                })
                .then(response =>{
                    if (!response.ok){
                        throw new Error('Failed to update')
                    }
                    return response.json()
                })
                .then(updatedVenue =>{
                    console.log('update successsful', updatedVenue)
                    window.location.reload()
                })
                .catch(error =>{
                    console.log('error', error)
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

    const openReviewModal = () =>{
        setShowReviewModal(true)
    }

    const closeReviewModal = () =>{
        setShowReviewModal(false)
    }

    const openClaimModal = () =>{
        setShowClaimModal(true)
    }

    const closeClaimModal = () =>{
        setShowClaimModal(false)
    }

    const openEditModal = () =>{
        setShowEditModal(true)
    }

    const closeEditModal = () =>{
        setShowEditModal(false)
    }

    
    return(
       <div>
       <div>
        <div className='bg-blue-500 text-slate-300'>
        <h3 className='text-7xl font-bungee'><a href={venue.website} target='_blank' rel='noopener noreferrer'>{venue.name}</a></h3>
        <h4 className='text-xl'>{venue.address}</h4>
        </div>
       
        <br></br>
        <br></br>
<div className='space-y-2 ml-4'>



<div>
  {venueID === null ? (
    <button
    className='w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    onClick={openClaimModal}
  >
    Claim Venue
  </button>
    
  ) : (
    <button
      className='w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={openEditModal}
    >
      Edit Venue
    </button>
  )}
</div>
<button
className='w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
onClick={openReviewModal}
>Add Review</button>
<br></br>
<button
className='w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
onClick={openEventModal}
>Add Event</button>
<br></br>

<div className='bg-slate-300 inline-block p-4 rounded-md shadow-md'>
    
<button onClick={handleLGBTDown} disabled={lgbtqDownClicked} >👎</button> LGBTQ Friendliness Score: {venue.lgbtq_score} <button onClick={handleLGBTUp} disabled={lgbtqUpClicked}>👍</button>
<br></br>

<button onClick={handleSafetyDown} disabled={safetyDownClicked}>👎</button> Safety Score: {venue.safety_score} <button onClick={handleSafetyUp} disabled={safetyUpClicked}>👍</button>
</div>

<br></br>

<p><strong>Reviews:</strong></p>
<br></br>
</div>

<div className='bg-slate-300 inline-block p-4 rounded-md shadow-md'>
        <div className='space-y-2 ml-4'>
            {mappedReviews}
        </div>
        </div>
        <br></br>
        <br></br>

        <div className='bg-blue-500 inline-block p-4 rounded-md shadow-md'>
        <div className='grid grid-cols-5 gap-4'>
            {photos.map(photo =>(
                <div key={photo.id} className='relative overflow-hidden' onClick={() => openModal(photo)}>
                <PhotoCard  photo={photo} id={id} />
                </div>
            ))}
        </div>
        </div>
       
       
        <br></br>


        {showReviewModal &&(
            <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                <div className='bg-white p-8 rounded-lg z-10'>
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
            <button 
                type="button"
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={closeReviewModal}
                >Close</button>
        </form>

                </div>

            </div>
    
        )}

{showClaimModal &&(
            
            <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                <div className='bg-white p-8 rounded-lg z-10'>
            <p>Are you sure you want to claim ownership of {venue.name}?</p>
            <button 
                type="button"
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleMultipleClicks(closeClaimModal, claimVenue)}
                >Yes</button>
                <button 
                type="button"
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={closeClaimModal}
                >No</button>

            </div>
            </div>
    
        )}



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
                >Create Event</button>
                <button 
                type="button"
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={closeEventModal}
                >Close</button>

            </form>

                </div>

            </div>
    
        )}


{showEditModal &&(
            <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                <div className='bg-white p-8 rounded-lg z-10'>
                <form onSubmit={handleVenueEdit}>
            <label className='label' htmlFor="name">Name</label>
                <input 
                name='name'
                placeholder='name'
                value={venueData.name}
                onChange={handleVenueChange}
                />
                <label className='label' htmlFor="address">Address</label>
                <input 
                name='address'
                placeholder='Address'
                value={venueData.address}
                onChange={handleVenueChange}
                />
                <label className='website' htmlFor="name">Website</label>
                <input 
                name='website'
                value={venueData.website}
                onChange={handleVenueChange}
                />
                <button 
                type="submit"
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >Save Changes</button>
                <button 
                type="button"
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={closeEditModal}
                >Close</button>
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