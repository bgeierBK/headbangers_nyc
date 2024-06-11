import React, {useEffect, useState} from 'react'

function PhotoCard({photo}){

    
    return(
       <div>
<img className="size-40" src={photo.url}></img>

       </div>
    )

}

export default PhotoCard

// uploads/Screenshot_2024-05-29_at_2.40.30_PM.png
