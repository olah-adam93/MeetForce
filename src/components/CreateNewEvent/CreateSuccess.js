import React from 'react';
import './Styles/CreateSuccess.css';
import upload_event from '../../others/decoration/upload_event.svg'
import { useNavigate } from 'react-router-dom';
function CreateSuccess() {
  const navigateTo = useNavigate();
  return (
    <div className='create-success-container'>
      <div>
        <h2>You have successfully created an event! </h2>
        <button onClick={()=> navigateTo('/profile/myevents')}>Back to My Events!</button>
      </div>
      <img src={upload_event} alt="upload event"/>
    </div>
  );
}

export default CreateSuccess;
