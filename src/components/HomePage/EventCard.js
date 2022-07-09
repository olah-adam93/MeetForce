import { Link } from 'react-router-dom';
import { useState, useParams, useEffect, useContext } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
/* Style */
import './Styles/EventCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';

/*Firebase*/
import { storage } from '../../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/* CRUD */
import { readData } from '../../services/crud';
import { liveValue } from '../../services/crud';

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
  const [userAvatarData, setUserAvatarData] = useState([]);
  const [attendeesNo, setAttendeesNo] = useState([]);
  const [attendeesNm, setAttendeesNm] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    readData('eventAttendees', eventId).then((snapshot) => {
      setAttendeesNo(Object.keys(snapshot.val() || {}));
    });
    readData('eventAttendees', eventId).then((snapshot) => {
      setAttendeesNm(Object.values(snapshot.val() || {}));
    });
  }, [eventId]);

  //console.log(attendeesNb);

  return (
    <div
      className={
        eventSearchStyle ? 'event-card-container-search' : 'event-card-container'
      }
    >
      <Link
        className={
          eventSearchStyle
            ? 'event-card-inner-container-search'
            : 'event-card-inner-container'
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
                <p
                  className={
                    eventSearchStyle
                      ? 'event-picture-default-logo-search'
                      : 'event-picture-default-logo'
                  }
                >
                  Meetforce
                </p>
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
              {eventCard?.title.length > 45
                ? eventCard?.title.slice(0, 45) + '...'
                : eventCard?.title}
            </div>

            <p
              className={
                eventSearchStyle ? 'event-data-location-search' : 'event-data-location'
              }
            >
              {eventCard?.location || eventCard?.locationType}
            </p>

            <p className='event-data-organizer-search'>
              Organizer: {eventCard?.organizer}
            </p>

            {/* {attendees.includes(authContext.userLog.user.uid) && window.location.href.indexOf("profile") === -1 && window.location.href.indexOf("home") === -1 && <p className='event-data-joined-message-search'>Already joined!</p>} */}

            <p
              className={
                eventSearchStyle ? 'event-data-attendees-search' : 'event-data-attendees'
              }
            >
              {attendeesNo.length === 0 ? 0 : attendeesNo.length} attendees
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
