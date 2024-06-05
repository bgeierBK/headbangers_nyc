import React from 'react'
import {Outlet} from "react-router-dom"
import {useEffect, useState} from "react"
import NavBar from "../components/NavBar"

function App(){

const [currentUser, setCurrentUser] = useState(null)
const [venues, setVenues] = useState([])
const [users, setUsers] = useState([])
const [events, setEvents] = useState([])

useEffect(() =>{
    fetch('/api/users')
    .then(res => res.json())
    .then(users => setUsers(users))
}, [])



console.log(users)


return(

    <div className="App">
        <NavBar currentUser = {currentUser}/>
        <h1>Headbangers NYC</h1>

        <Outlet context={{currentUser:currentUser, setCurrentUser:setCurrentUser}} />
    </div>
)

}

export default App