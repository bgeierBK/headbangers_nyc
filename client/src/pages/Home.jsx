import VenueContainer from '../components/VenueContainer'
import AddVenue from '../components/AddVenueForm'
import React, {useEffect, useState} from 'react'


function Home(){
    const [venues, setVenues] = useState([])
    return(
        <>
        <h2>Home Page</h2>
        <AddVenue venues= {venues} setVenues={setVenues}/>
        <VenueContainer venues= {venues} setVenues={setVenues} />
        </>
    )
}

export default Home