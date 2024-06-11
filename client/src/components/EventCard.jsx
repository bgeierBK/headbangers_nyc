import React, {useState} from 'react'
import PhotoCard from './PhotoCard.jsx'
import axios from 'axios'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

function EventCard({event}){

    const [file, setFile] = useState(null)
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
    } catch (error){
        setMessage('Error uploading photo');
        console.error('Error ploading photo', error)
    }
}



   

   const mappedPhotos = event.photos.map(photo =>{
    return <PhotoCard key = {photo.id} photo={photo} />
   })
console.log(event.photos)
    
    return(

        <>
        <h2>{event.headliner}</h2>
        <h3>{event.opening_acts}</h3>
        <h3>{event.venue.name}</h3>
        <h4>{formattedDate}</h4>
        <h5>Event Photos:</h5>
        <br></br>
        <br></br>
        {mappedPhotos}
        <br></br>
        <h5>Add a photo for this event:</h5>
        <form onSubmit={handlePhotoSubmit}>
            <label>Choose file:
                <input type="file" onChange={handleFileChange} required></input>
            </label>
            <button type="submit">Upload Photo</button>
        </form>
        </>
    )
}

export default EventCard