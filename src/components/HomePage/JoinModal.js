/* work in progress */

import './Styles/JoinModal.css';

import { updateData } from '../../services/crud';
import { auth } from '../../config/firebase';
import { readData } from '../../services/crud';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import StripePayment from './StripePayment';

const JoinModal = ({ clickHandler, setIsOpen, eventKey, eventValue }) => {
  const user = auth.currentUser;
  const navigateTo = useNavigate();
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    readData('eventAttendees', eventKey).then((snapshot) => {
      setAttendees(Object.keys(snapshot.val()));
    });
  }, [eventKey]);

  console.log(attendees, Number(eventValue?.attendant));

  const joinHandler = (event) => {
    updateData('eventAttendees', eventKey, {
      [user.uid]: user.displayName,
    }).then(() => {
      setIsOpen(false);
    });
    navigateTo("/join-success")
  };

  // }).then(() => {
  //   navigate("../join-success", { replace: true });
  // });

  return (
    <div className='joinmodal-container'>
      <div className="join-modal-box">
        <div className='joinmodal-image-container'>
          <img
            className='joinmodal-image'
            src={eventValue?.imageUrl}
            alt={eventValue?.title}
          />
        </div>
        <div className='joinmodal-others-container'>
          <div className='joinmodal-details'>
            <h3 className='joinmodal-details-title'>Event title: {eventValue?.title}</h3>
            <div className='joinmodal-details-place'>
              Event place: {eventValue?.location}
            </div>
            <div className='joinmodal-details-date'>
              Event date: {eventValue?.eventStarts}
            </div>
            <div className='joinmodal-details-attendees'>
              Event attendees: {attendees.length}
            </div>
            <br />
            <div className='joinmodal-bottom-buttons'>
              <button
                className='joinmodal-close-button'
                onClick={clickHandler}
                type='button'
              >
                Close
              </button>
              
              {
              user ? (
                attendees.includes(user.uid) ? (
                  <span>Already joined!</span>
                ) : attendees.length !== Number(eventValue?.attendant) ? (
                  eventValue?.paymentType === 'ticket' ? (
                    <StripePayment eventKey={eventKey} eventValue={eventValue} />
                  ) : (
                    <button
                      className='joinmodal-join-button'
                      type='button'
                      onClick={joinHandler}
                    >
                      Join
                    </button>
                  )
                ) : (
                  <span>This event is full!</span>
                )
              ) : (
                <button onClick={() => navigateTo('/signin')}>Sign in to subscribe</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinModal;
