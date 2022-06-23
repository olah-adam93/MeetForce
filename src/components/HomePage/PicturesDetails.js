import React from 'react'
import './Styles/PicturesDetails.css'
import calendar from  '../../others/images/calendar.jpg'
import profile from  '../../others/images/profile.png'
import search from  '../../others/images/search.jpg'

function PicturesDetails() {
  return (
    <div className="pictures-details">
    <div className="flex"> <img className='picture' src={calendar} alt="calendar"/>  <div className='text'> <h3 className='title'>Join an adventure!</h3> <p>Create or join an event! Find new entertainment! </p> </div>  </div>
    <div className="flex"> <img className='picture' src={profile} alt="profile"/> <div className='text'> <h3 className='title'> Create profile!</h3> <p>Find new friends! </p> </div> </div> 
    <div className="flex"> <img className='picture' src={search} alt="search"/> <div className='text'> <h3 className='title'> Find an event!</h3> <p> Find any activity! You can choose from many options! </p> </div>
   </div>
  </div>
  )
}

export default PicturesDetails

