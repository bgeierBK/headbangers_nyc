import VenueContainer from '../components/VenueContainer'
import AddVenue from '../components/AddVenueForm'
import React, {useEffect, useState} from 'react'


function Home(){
    const [venues, setVenues] = useState([])
    return(
        <div className='relative'>
            <div className='fixed top-25 right-2'>
                <AddVenue venues= {venues} setVenues={setVenues}/>    
            </div>
            <div>
                <VenueContainer venues= {venues} setVenues={setVenues} />
            </div>
        </div>
    )
}

export default Home