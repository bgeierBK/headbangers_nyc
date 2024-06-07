import React, {useEffect, useState} from 'react'

function ReviewCard({review}){

    const userName = review.user?.username || 'Anonymous'
    
    return(
        <div>
            <strong><p>{userName}</p></strong>{review.review_content}
        </div>
    )

}

export default ReviewCard