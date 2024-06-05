import {useState} from 'react'
import { useOutletContext } from 'react-router-dom'

function SignUp(){
const [username, setUserName] = useState('')
const [age, setAge] = useState('')
const [password, setPassword] = useState('')
const [email_address, setEmail] = useState('')
const [bio, setBio] = useState('')

const{setCurrentUser}=useOutletContext()



function handleSubmit(event){
    event.preventDefault()
    fetch('/api/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({username, age, password, email_address, bio})
    })
    .then(response =>{
        if (response.ok){
            response.json()
            .then(newUser => setCurrentUser(newUser))
        } else{
            alert("Problem with signup")
        }
    })
}

return(
    <form className='user_form' onSubmit={handleSubmit}>
        <h3>Signup</h3>

        <input type="text"
        name='username'
        onChange={e => setUserName(e.target.value)}
        placeholder = 'Username'
        value={username}
        />
        <input type="number"
        name='age'
        onChange={e => setAge(e.target.value)}
        placeholder = 'Age'
        value={age}
        />

        <input type="password"
        name='password'
        onChange={e => setPassword(e.target.value)}
        placeholder = 'Password'
        value={password}
        />

        <input type="text"
        name= 'email_address'
        onChange={e => setEmail(e.target.value)}
        placeholder = 'Email address'
        value={email_address}
        />

        <textarea
        name='bio'
        onChange={e => setBio(e.target.value)}
        placeholder = 'Bio'
        value={bio}
        />

        <input type="submit"
        value='Signup'
        />


    </form>
)

}

export default SignUp