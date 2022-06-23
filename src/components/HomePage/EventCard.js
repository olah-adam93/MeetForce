import {Link} from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
/* Style */
import './Styles/EventCard.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCalendarXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
/* Image */
import eventImagePlaceholder from '../../others/logo/logo7.3.png';

import { AuthContext } from '../Authentication/AuthContext';

/* CRUD */
import { readData } from '../../services/crud';
import {liveValue} from '../../services/crud';

const EventCard = ({
  eventSearchStyle,
  eventObj,
  eventCard,
  eventId,
  isUnsubscribeButton,
  isDeleteButton,
  unsubscribeModalHandler,
  deleteModalHandler,
}) => {
  const [attendees, setAttendees] = useState([]);
  const authContext = useContext(AuthContext);
  
  useEffect(() => {
      readData('eventAttendees', eventId).then((snapshot) => {
          setAttendees(Object.keys(snapshot.val() || {}));
      });
  }, [eventId]);

  // useEffect(() => {
  //     liveValue(`eventAttendees/${eventId}`, (snapshot) => {
  //       setAttendees(Object.keys(snapshot.val() || {}));
  //     });
  // }, [eventId]);

  return (
    <div className={eventSearchStyle ? 'event-card-container-search' : 'event-card-container'}>
      <Link
        className={
          eventSearchStyle ? 'event-card-inner-container-search' : 'event-card-inner-container'
        }
        to={`/eventpage/${eventId}`}
      >
        <div className={eventSearchStyle ? 'event-card-search' : 'event-card'}>
          <div
            className={
              eventSearchStyle
                ? 'event-picture-container-search'
                : 'event-picture-container'
            }
          >
            <div
              className={
                eventSearchStyle
                  ? 'event-picture-img-link-search'
                  : 'event-picture-img-link'
              }
            >
              {eventCard?.imageUrl ? (
                <img
                  className={
                    eventSearchStyle ? 'event-picture-img-search' : 'event-picture-img'
                  }
                  src={eventCard?.imageUrl}
                  alt={eventCard?.title}
                />
              ) : (
                <p className={eventSearchStyle ? 'event-picture-default-logo-search' : 'event-picture-default-logo'}>MeetAtSix</p>
                // <img
                //   className={
                //     eventSearchStyle
                //       ? 'event-picture-default-img-search'
                //       : 'event-picture-default-img'
                //   }
                //   src={eventImagePlaceholder}
                //   alt='default event'
                // />
              )}
            </div>
          </div>

          <div className={eventSearchStyle ? 'event-data-search' : 'event-data'}>
            <p
              className={eventSearchStyle ? 'event-data-date-search' : 'event-data-date'}
            >
              {new Date(eventCard?.eventStarts).toDateString() +
                ' - ' +
                eventCard?.startTime}
            </p>

            <div
              className={
                eventSearchStyle ? 'event-data-title-search' : 'event-data-title'
              }
            >
              {eventCard?.title.length > 45 ? eventCard?.title.slice(0, 45) + '...' : eventCard?.title}
            </div>
              
            <p
              className={
                eventSearchStyle ? 'event-data-location-search' : 'event-data-location'
              }
            >
              {eventCard?.location || eventCard?.locationType}
            </p>

            <p>Organizer: {eventCard?.organizer}</p>

            {/* {attendees.includes(authContext.userLog.user.uid) && window.location.href.indexOf("profile") === -1 && window.location.href.indexOf("home") === -1 && <p className='event-data-joined-message-search'>Already joined!</p>} */}

            <p
              className={
                eventSearchStyle ? 'event-data-attendees-search' : 'event-data-attendees'
              }
            >
              {attendees.length === 0 ? 0 : attendees.length} attendees
            </p>
          </div>
        </div>
      </Link>

      <div className='event-card-button'>
        {isUnsubscribeButton && (
          <>
            <button type='button' onClick={unsubscribeModalHandler(eventObj)}>
            <FontAwesomeIcon icon={faCalendarXmark} />
            </button>
          </>
        )}
        {isDeleteButton && (
          <>
            <button type='button' onClick={deleteModalHandler(eventObj)}>
            <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default EventCard;
