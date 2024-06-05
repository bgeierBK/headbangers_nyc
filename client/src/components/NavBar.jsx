import {userState} from 'react'
import {NavLink} from "react-router-dom"
import '../index.css'

function NavBar(){
return(
    <nav id="navbar">
        <div id='links'>
            <NavLink to='/'
            className='navlink'>
                Home 
            </NavLink>
            <NavLink to='/profile'
            className='navlink'>
                My Profile 
            </NavLink>
            <NavLink to='/scrapbook'
            className='navlink'>
                My Scrapbook 
            </NavLink>
        </div>

    </nav>
)
}


export default NavBar