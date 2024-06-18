import VenueContainer from '../components/VenueContainer'
import AddVenue from '../components/AddVenueForm'
import React, {useEffect, useState} from 'react'


function Home(){
    const [venues, setVenues] = useState([])
    return(
        <div className='relative'>
            <div className='bg-slate-300 pg-6 rounded-md shadow-md'>
            <div className='fixed top-20 right-2 sm:top-25'>
                <AddVenue venues= {venues} setVenues={setVenues}/>  
                </div>  
            </div>
            <div className='ml-4 sm:ml-0'>
                <VenueContainer venues= {venues} setVenues={setVenues} />
            </div>
        </div>
    )
}

export default Home