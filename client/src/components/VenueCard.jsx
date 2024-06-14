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
        <h4><a href={venue.website} target='_blank' rel='noopener noreferrer'>{venue.website}</a></h4>
        </div>
    )

}

export default VenueCard