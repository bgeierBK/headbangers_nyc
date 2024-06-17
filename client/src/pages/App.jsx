import React from 'react'
import {Outlet} from "react-router-dom"
import {useEffect, useState} from "react"
import NavBar from "../components/NavBar"

function App(){

const [currentUser, setCurrentUser] = useState(null)
const [users, setUsers] = useState([])
const [events, setEvents] = useState([])

useEffect(() =>{
    fetch('/api/users')
    .then(res => res.json())
    .then(users => setUsers(users))
}, [])


useEffect(() =>{
    fetch('/api/check_session')
    .then(response =>{
        if (response.status === 200){
            response.json()
            .then(loggedInUser => setCurrentUser(loggedInUser))
        }
    })
}, [])



console.log(currentUser)


return(

    <div className="bg-neutral-200">
        <NavBar currentUser = {currentUser} setCurrentUser={setCurrentUser}/>
        <br></br>
        <div className='font-newRocker text-4xl text-blue-500'>
        <h1>Headbangers NYC</h1>
        </div>
        <br></br>
        <Outlet context={{currentUser:currentUser, setCurrentUser:setCurrentUser, }} />
    </div>
)

}

export default App