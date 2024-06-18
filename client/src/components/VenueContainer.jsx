import {useState, useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'
import VenueCard from '../components/VenueCard.jsx'

function VenueContainer({venues, setVenues}){
    
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredVenues, setFilteredVenues] = useState([])

   useEffect(() => {
    fetch('/api/venues')
    .then(res => res.json())
    .then(venues => {
        setVenues(venues);
        setFilteredVenues(venues)
    })
   }, [])

   function handleSearchChange(event){
    setSearchTerm(event.target.value)
   }
        
   useEffect(() =>{
    const filtered = venues.filter(venue =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVenues(filtered)
   }, [searchTerm, venues])

    const mappedVenues = filteredVenues.map(venue =>{
        return <VenueCard key={venue.id} venues={venues} setVenues={setVenues} venue={venue} />
    })
return(
    <div className='container mx-auto p-4'>
    <div className='bg-slate-300 p-6 rounded-md shadow-md inline-block'>
    <div className='mb-4'>
    <label htmlFor="search">Search by name:</label>
    <input
    type ="text"
    placeholder="Search venues by name"
    value={searchTerm}
    onChange={handleSearchChange}
    className='block text-gray-700 font-semibold mb-2'

    />
    </div>
    </div>
    <br></br>

    <div className='flex flex-col space-y-4 items-start'>
        {mappedVenues}
    </div>
    </div>
)
}

export default VenueContainer