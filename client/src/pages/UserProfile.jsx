import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import EventCard from '../components/EventCard'

function UserProfile(){
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const [events, setEvents] = useState([])
    
    useEffect(() =>{
        fetch(`/api/users/${id}`)
        .then(response =>{
            if (!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        .then((data) =>{
            setUser(data);
            setEvents(data.events);
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


const mappedEvents = events.map(event =>{
    return <EventCard key={event.id} event={event} />
})


    return(
        <>
        <h2>UserProfile Page</h2>
        <h1>{user.username}</h1>
        <h2>{user.bio}</h2>
        {mappedEvents}
    
    </>
    )
}

export default UserProfile