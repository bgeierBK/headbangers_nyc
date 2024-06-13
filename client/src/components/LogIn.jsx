import {useState} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'

function LogIn(){
const [username, setUserName] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()
const{setCurrentUser}=useOutletContext()



function handleSubmit(event){
    event.preventDefault()
    
    fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({username, password})
    })
    .then(response =>{
        if (response.ok){
            response.json()
            .then(user => setCurrentUser(user))
            navigate('/')
        } else{
            alert("Invalid username or password!")
        }
    })
}

return(
    <form className='user_form' onSubmit={handleSubmit}>
        <h3>Log In!</h3>

        <input type="text"
        name='username'
        onChange={e => setUserName(e.target.value)}
        placeholder = 'Username'
        value={username}
        />

        <input type="password"
        name='password'
        onChange={e => setPassword(e.target.value)}
        placeholder = 'Password'
        value={password}
        />

        <input type="submit"
        value='Log In'
        />


    </form>
)

}

export default LogIn