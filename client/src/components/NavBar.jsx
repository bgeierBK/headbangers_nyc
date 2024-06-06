import {userState} from 'react'
import {NavLink} from "react-router-dom"
import '../index.css'

function NavBar({currentUser, setCurrentUser}){
    function handleLogOut(){
        fetch('/api/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok){
                setCurrentUser(null);
                alert("Logged out successfully!")
            } else {
                alert("failed to log out")
            }
        })
        .catch(error =>{
            console.error("Problem with logout:", error.message);
            alert("Problem with logout:" + error.message)
        })
    }

    return(
    <nav id="navbar">
        
        {
            currentUser == null
            ?
            <div>
            <NavLink to='/signup'
            className='navlink'>
                Signup 
            </NavLink>
            <NavLink to='/login'
            className='navlink'>
                Login
            </NavLink>
            </div>
            :
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
            <button onClick={handleLogOut}>Log Out</button>
            </div>

           
            }
      
    
    </nav>
)
}


export default NavBar

/*
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
            */