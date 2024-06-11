import React, {useEffect, useState} from 'react'

function PhotoCard({photo}){

 console.log(photo.file)

 const imagePath = `Users/ben/Development/code/phase-5/headbangers_nyc/uploads/${photo.file}`
    
    return(
       <div>
<img src={imagePath}></img>

       </div>
    )

}

export default PhotoCard

// uploads/Screenshot_2024-05-29_at_2.40.30_PM.png
