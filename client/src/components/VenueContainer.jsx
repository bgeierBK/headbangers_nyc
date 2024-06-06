import {useState, useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'
import VenueCard from '../components/VenueCard.jsx'

function VenueContainer(){
    const [venues, setVenues] = useState([])
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
    <>
    <div>
    <label htmlFor="search">Search by name:</label>
    <input
    type ="text"
    placeholder="Search venues by name"
    value={searchTerm}
    onChange={handleSearchChange}
    />
    </div>

    <div>
        {mappedVenues}
    </div>
    </>
)
}

export default VenueContainer