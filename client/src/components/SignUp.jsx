import {useState} from 'react'
import { useOutletContext } from 'react-router-dom'

function SignUp(){
const [formData, setFormData] = useState({
    username: "",
    age: "",
    _hashed_password: "",
    email_address: "",
    bio:""
})

function handleChange(event){
    setFormData({
        ...formData,
        [event.target.name]: event.target.value
    })
}

function handleSubmit(event){
    event.preventDefault
}

}