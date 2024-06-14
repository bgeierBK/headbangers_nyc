import React, {useState} from 'react'
import PhotoCard from './PhotoCard.jsx'
import Modal from './Modal'
import axios from 'axios'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import backgroundImage from '/Users/ben/Development/code/phase-5/headbangers_nyc/client/src/images/ticket.png'

function EventCard({event}){

    const [isOpen, setIsOpen] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [file, setFile] = useState(null)
    const [photos, setPhotos] = useState(event.photos || [])
    const [message, setMessage]= useState('')
    
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US',{
        year: 'numeric',
        month: 'long',
        day:'numeric'
    })

    function handleFileChange(event){
        setFile(event.target.files[0])
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
            user_id: event.user.id,
            venue_id: event.venue.id,
            event_id: event.id
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
   

   const mappedPhotos = photos.map(photo => (
    <div key={photo.id} className='relative overflow-hidden' onClick={() => openModal(photo)}>
        <PhotoCard photo={photo}/>
    </div>
   ))
    
    return(

        <>
        <div
        className='relative bg-no-repeat bg-center bg-cover h-auto w-full max-w-lg my-8 p-8 mx-auto'
        style={{
            backgroundImage: `url(${backgroundImage})`,
        }}
        >
            
            <div className='relative text-center font-specialElite'>  
                <h2 className='text-3xl font-bold text-black'>{event.headliner}</h2>
                <h3 className='text-2xl text-black'>{event.opening_acts}</h3>
                <h3 className='text-xl text-black'>{event.venue.name}</h3>
                <h4 className='text-lg text-black'>{formattedDate}</h4>
            </div>  
        </div>
        <h5>Event Photos:</h5>
        <br></br>
        <br></br>
        <div className= 'grid grid-cols-5 gap-4'>
        {mappedPhotos}
        </div>
        <br></br>
        <h5>Add a photo for this event:</h5>
        <form onSubmit={handlePhotoSubmit}>
            <label>Choose file:
                <input type="file" onChange={handleFileChange} required></input>
            </label>
            <button type="submit">Upload Photo</button>
        </form>
        {isOpen && (
            <Modal photo={selectedPhoto} closeModal={closeModal} />
        )}
        </>
    )
}

export default EventCard