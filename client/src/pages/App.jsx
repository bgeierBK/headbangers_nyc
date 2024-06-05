import React from 'react'
import {Outlet} from "react-router-dom"
import {useEffect, useState} from "react"

function App(){

const [currentUser, setCurrentUser] = useState(null)

return(

    <div className="App">
        <h1>Headbangers NYC</h1>

        <Outlet context={{currentUser:currentUser, setCurrentUser:setCurrentUser}} />
    </div>
)

}

export default App