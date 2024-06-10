import React, {useState} from 'react'

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
    formData.append('user_id', event.user.id);
    formData.append('venue_id', event.venue.id);
    formData.append('event_id', event.id);

    try{
        const response = await fetch('/api/photos', {
            method: 'POST',
            body: formData
        });
        if (!response.ok){
            throw new Error('Failed to upload photo')
        }

        const result = await response.json();
        setMessage('photo uploaded successfully');
        console.log('photo uploaded successfully', result);
    } catch(error){
        setMessage('Error uploading photo');
        console.error('Error uploading photo', error)
    }
    
   }
    
    return(

        <>
        <h2>{event.headliner}</h2>
        <h3>{event.opening_acts}</h3>
        <h3>{event.venue.name}</h3>
        <h4>{formattedDate}</h4>
        <h5>Event Photos:</h5>
        <br></br>
        <br></br>
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