function EventCard({event}){

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US',{
        year: 'numeric',
        month: 'long',
        day:'numeric'
    })
    
    return(

        <>
        <h2>{event.headliner}</h2>
        <h3>{event.opening_acts}</h3>
        <h4>{formattedDate}</h4>
        </>
    )
}

export default EventCard