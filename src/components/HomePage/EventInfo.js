import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

/* Components */
import JoinModal from './JoinModal';
import StripePayment from './StripePayment';

/* Firebase */
// import { getAuth, getUser } from 'firebase/auth';
import {auth} from '../../config/firebase';

/* CRUD */
import {readData, updateData} from '../../services/crud';

/* Fontawesome */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons';
import {faEarthEurope, faGlobe} from '@fortawesome/free-solid-svg-icons';

const EventInfo = ({eventInfo, isOpen, setIsOpen, paymentSucces}) => {
  const [organizerData, setOrganizerData] = useState(false);
  const [eventKey, eventValue] = eventInfo;
  const user = auth.currentUser;
  const [attendees, setAttendees] = useState([]);
  const navigateTo = useNavigate();

  // useEffect(() => {
  //   readData('eventAttendees', eventKey).then((snapshot) => {
  //     setAttendees(Object.entries(snapshot.val() || {}));
  //   });
  // }, [eventKey]);

  useEffect(() => {
    readData('eventAttendees', eventKey).then((snapshot) => {
      setAttendees(Object.keys(snapshot.val() || {}));
    });
  }, [eventKey]);

  const clickHandler = () => {
    /* setIsOpen(!isOpen);
    console.log(isOpen); */
    updateData('eventAttendees', eventKey, {
      [user.uid]: user.displayName,
    }).then(() => {
      // setIsOpen(false);
    });
    navigateTo("/join-success")
  };

  const clickOrganizer = (e) => {
    if (organizerData) {
      setOrganizerData(false);
    } else {
      setOrganizerData(true);
    }
  };

  return (
    <div className='event-info-container'>
      {paymentSucces && <h2>Successfull payment!</h2>}

      <div className='event-info-date'>
        <FontAwesomeIcon className='event-info-icons' icon={faClock} />
        {new Date(eventValue?.eventStarts).getTime() ===
        new Date(eventValue?.eventEnds).getTime()
          ? `${new Date(eventValue?.eventStarts).toDateString()}`
          : `${new Date(eventValue?.eventStarts).toDateString()} - ${new Date(
              eventValue?.eventEnds
            ).toDateString()}`}
      </div>

      <div className='event-info-time'>
        {`${eventValue?.startTime} - ${eventValue?.endTime}`}
      </div>

      <div className='event-info-location'>
        {eventValue?.locationType === 'online' ? (
          <>
            {<FontAwesomeIcon className='event-info-icons' icon={faGlobe} />}
            Online event
          </>
        ) : (
          <>
            {<FontAwesomeIcon className='event-info-icons' icon={faEarthEurope} />}
            {eventValue?.location}
          </>
        )}
      </div>

      <div className='event-info-organizer' onClick={clickOrganizer}>
        Organizer: {eventValue?.organizer}
      </div>
      {/* {organizerData && (
        <div>
        <p>Event organizer contact: {eventValue?.organizerEmail}</p>
        <button onClick={clickOrganizer}>X</button>
        </div>
      )} */}

      <div className='event-info-attendees'>
        {/* Attendees: {attendees.length === 0 ? 0 : attendees.length} / {eventValue?.attendant} */}
        Attendees: {attendees.length === 0 ? 0 : attendees.length}
      </div>

      {user?.uid !== eventValue?.uid && <div className='event-info-price'>
        {eventValue?.paymentType === 'free' ? (
          <>{eventValue?.paymentType}</>
        ) : (
          <>{eventValue?.ticketPrice} huf</>
        )}
      </div>}

      {user ? (
        user?.uid === eventValue?.uid ? (
          <div className='event-info-alert'>You are the organizer of this event!</div>
        ) : attendees.includes(user.uid) ? (
          <div className='event-info-alert'>Already joined!</div>
        ) : attendees.length === Number(eventValue?.attendant) ? (
          <div className='event-info-alert'>This event is full!</div>
        ) : eventValue?.paymentType === 'ticket' ? (
          <StripePayment eventKey={eventKey} eventValue={eventValue}/>
        ) : (
          <button onClick={clickHandler} className='event-info-button'>
            {' '}
            Register{' '}
          </button>
        )
      ) : (
        <button className='event-info-button' onClick={() => navigateTo('/signin')}>Sign in to subscribe</button>
      )}

      {/* {isOpen && (
        <JoinModal
          clickHandler={clickHandler}
          setIsOpen={setIsOpen}
          eventKey={eventKey}
          eventValue={eventValue}
        />
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
      )} */}
    </div>
  );
};

export default EventInfo;
