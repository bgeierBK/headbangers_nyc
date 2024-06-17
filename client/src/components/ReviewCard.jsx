import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

function ReviewCard({review}){

    const userName = review.user?.username || 'Anonymous'

    console.log(review)

    
    return(
        <div className="flex space-x-2">
            <strong>
  {review.user ? (
    <Link to={`/users/${review.user.id}`}>{userName}:</Link>
  ) : (
    <span>{userName}:</span>
  )}
</strong>: <p>{review.review_content}</p>
            
            
        </div>
    )

}

export default ReviewCard

// 