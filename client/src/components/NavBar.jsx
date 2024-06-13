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
            <div className='flex justify-end space-x-2'>
            <NavLink to='/'
            className='navlink'>
                Home 
            </NavLink>
            <NavLink to='/about'
            className='navlink'>
                About 
            </NavLink>
            <NavLink to='/signup'
            className='navlink bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700'>
                Signup 
            </NavLink>
            <NavLink to='/login'
           className='navlink bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700'>
                Login
            </NavLink>
            </div>
            :
        <div className='flex justify-end space-x-2'>
            <NavLink to='/'
            className='navlink'>
                Home 
            </NavLink>
            <NavLink to={`/users/${currentUser.id}`}
            className='navlink'>
                My Profile 
            </NavLink>
            <NavLink to='/about'
            className='navlink'>
                About 
            </NavLink>
            <button
            className='navlink bg-transparent hover:bg-gray-200 text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded'
            onClick={handleLogOut}>Log Out</button>
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