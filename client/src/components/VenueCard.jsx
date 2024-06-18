import {useState, useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom';

function VenueCard({venues, setVenues, venue}){

    console.log(venue.reviews)

    const firstReview = venue.reviews.length > 0 ? venue.reviews[0] : null

  

    


    return(
        <div className='border-2 border-blue-500 bg-slate-300 rounded-lg p-6 mb-6 shadow-lg bg max-w-md w-full mx-auto'>
        <h2 className='text-2xl font-semibold mb-2'>
            <Link to={`/venue/${venue.id}`} className='text-blue-500 hover:underline'>
            {venue.name}
            </Link>
        </h2>
        <h3 className='text-lg mb-2'>{venue.address}</h3>
        <h4><a href={venue.website} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>{venue.website}</a></h4>
        {firstReview &&(
            <div className='mt-4'>
                <div className='mt-4 flex items-center'>
               <p className='mr-2'> <strong>{firstReview.user.username}:</strong></p> <em><p>{firstReview.review_content}</p></em>
               </div>
            </div>
        )}
        </div>
    )

}

export default VenueCard