import {useState} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'

function SignUp(){
const [username, setUserName] = useState('')
const [age, setAge] = useState('')
const [password, setPassword] = useState('')
const [email_address, setEmail] = useState('')
const [bio, setBio] = useState('')
const navigate= useNavigate()
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
            navigate('/')
        } else{
            alert("Problem with signup")
        }
    })
}

return(
    <form className='bg-slate-300 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto' onSubmit={handleSubmit}>
        <h3 className='text-2xl font-semibold mb-6 text-gray-700'>Signup</h3>
        <div className='mb-4'>
            <label className='block font-medium mb-2'>Username:
                <input type="text"
                name='username'
                onChange={e => setUserName(e.target.value)}
                placeholder = 'Username'
                value={username}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
        </label>
        </div>
        <div className='mb-4'>
            <lable className='block font-medium mb-2'>Age:
                <input type="number"
                name='age'
                onChange={e => setAge(e.target.value)}
                placeholder = 'Age'
                value={age}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            </lable>
        </div> 
        <div className='mb-4'>
            <label className='block font-medium mb-2'>Password
                <input type="password"
                name='password'
                onChange={e => setPassword(e.target.value)}
                placeholder = 'Password'
                value={password}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            </label>
        </div>
        <div className='mb-4'>   
            <label className='block font-medium mb-2'>Email address:
                <input type="text"
                name= 'email_address'
                onChange={e => setEmail(e.target.value)}
                placeholder = 'Email address'
                value={email_address}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
        </label>
        </div>
        <div className='mb-4'>  
            <label className='block font-medium mb-2'>Bio:
                <textarea
                name='bio'
                onChange={e => setBio(e.target.value)}
                placeholder = 'Bio'
                value={bio}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            </label>
        </div>
        <input type="submit"
        value='Signup'
        />
    </form>
)

}

export default SignUp