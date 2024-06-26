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
    .then(newVenue =>{
        setVenues([...venues, newVenue])
        setFormData({
            name: "",
            address: "",
            burough: "",
            website: ""
        })
    })
}

return(
<div className='bg-slate-300 pg-6 rounded-md shadow-md'>
<div className='flex justify-end px-4'>

    <form id='addvalue' onSubmit={handleSubmit}>
        <div id="add head">
            <h2>Don't see your favorite venue? Add it!</h2>
        </div>
        <div className="flex flex-col font-bold">
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
            className='font-normal'
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
            <label className='label' htmlFor="burough">Website</label>
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
</div>
)
}

export default AddVenue