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
            console.log(data.events)
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
        <div className ='flex flex-col items-center'>
            <div className='text-center my-8' >
            <h1 className='text-3xl font-bold'>{user.username}</h1>
            <h2 className='text-xl'>{user.bio}</h2>
            </div>
        <div>
        {mappedEvents}
        </div>
    </div>
    )
}

export default UserProfile