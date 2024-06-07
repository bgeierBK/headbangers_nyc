import React, {useEffect, useState} from 'react'

function AddVenue({venues, setVenues}){
const [formData, setFormData] = useState({
    name: "",
    address: "",
    burough: "",
    website: ""
})

function handleChange(event){
    setFormData({
        ...formData,
        [event.target.name]: event.target.value
    })
}

function handleSubmit(event){
    event.preventDefault();
    const itemData ={
        name: formData.name,
        address: formData.address,
        burough: formData.burough,
        website: formData.website
    }
    fetch('/api/venues', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",

        },
        body: JSON.stringify(itemData)
    })
    .then(response => response.json())
    ,then(newVenue =>{
        setVenues([...venues, newVenue])
    })
}

return(

<div id="add">

    <form id='addvalue'>
        <div id="add head">
            <h2>Don't see your favorite venue? Add it!</h2>
        </div>
        <div id="form">
            <label className='label' htmlFor="name">Venue Name</label>
            <input 
            name='name'
            placeholder='name'
            value={formData.name}
            onChange={handleChange}
            />
            <label className='label' htmlFor="address">Address</label>
            <input 
            name='address'
            placeholder='Address'
            value={formData.address}
            onChange={handleChange}
            />
            <label className='label' htmlFor="burough">Burough</label>
            <select 
            name='burough'
            placeholder='Burough'
            value={formData.burough}
            onChange={handleChange}
            >
                <option value='Manhattan'>Manhattan</option>
                <option value='Brooklyn'>Brooklyn</option>
                <option value='Queens'>Queens</option>
                <option value='The Bronx'>The Bronx</option>
                <option value='Staten Island'>Staten Island</option>
            </select>
            <input 
            name='website'
            placeholder='Website'
            value={formData.website}
            onChange={handleChange}
            />
            <input
            type="submit"
            value="Add venue!"
            />

        </div>
    </form>

</div>
)
}

export default AddVenue