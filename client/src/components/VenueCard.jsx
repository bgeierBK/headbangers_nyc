import {useState, useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom';

function VenueCard({venues, setVenues, venue}){


    return(
        <div className='border-2 border-blue-500 rounded-md p-4 mb-4 max-w-lg'>
        <h2>
            <Link to={`/venue/${venue.id}`}>
            {venue.name}
            </Link>
        </h2>
        <h3>{venue.address}</h3>
        <h4>{venue.website}</h4>
        </div>
    )

}

export default VenueCard