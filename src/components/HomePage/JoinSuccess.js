import React from 'react'
import './Styles/JoinSuccess.css'
import success from '../../others/decoration/done4.svg'
import {useNavigate} from 'react-router-dom'
function JoinSuccess() {
  const navigateTo = useNavigate()
  return (
    <div className='join-success-container'>  
      <div>
        <h2>You have successfully applied for the event! </h2>
        <button onClick={()=> navigateTo('/profile/searchevent')}>Back to Searching Events!</button>
      </div>
      <img src={success} alt="join success" />
      
    </div>
  )
}

export default JoinSuccess;