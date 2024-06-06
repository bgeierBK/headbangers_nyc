import React, {useEffect, useState} from 'react'

function ReviewCard({review}){
    console.log(review)

    return(
        <div>
            <strong><p>{review.user.username}</p></strong>{review.review_content}
        </div>
    )

}

export default ReviewCard