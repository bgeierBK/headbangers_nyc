import {useState, useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'

function VenueCard({venues, setVenues, venue}){


    return(
        <>
        <h2>{venue.name}</h2>
        <h3>{venue.address}</h3>
        <h4>{venue.website}</h4>
        </>
    )

}

export default VenueCard