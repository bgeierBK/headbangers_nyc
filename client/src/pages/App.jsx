import React from 'react'
import {Outlet} from "react-router-dom"
import {useEffect, useState} from "react"
import NavBar from "../components/NavBar"
import { Link } from 'react-router-dom';
import backgroundImage from '/Users/ben/Development/code/phase-5/headbangers_nyc/client/src/images/background.jpg'

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

    <div className="relative min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='fixed top-0 left-0 right-0 z-20'>
        <NavBar currentUser = {currentUser} setCurrentUser={setCurrentUser}/>
        </div>
        <div className='relative z-10 pt-24'>
            <div className='font-newRocker text-4xl text-blue-500'>
                <Link to={`/`}><h1>Headbangers NYC</h1></Link>
            </div>
        <br></br>
        <Outlet context={{currentUser:currentUser, setCurrentUser:setCurrentUser, }} />
        </div>
    </div>  
)

}

export default App