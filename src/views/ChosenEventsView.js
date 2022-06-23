import './Style/ChosenEventView.css';
import joined_event from '../others/decoration/joined_event.svg';
import {useState, useContext, useEffect} from 'react';
import DisplayItems from '../components/SearchEvent/DisplayItems';

/* Database Context */
import {EventDbContext} from '../components/EventDbContext/EventDbContext';

/* AuthContext */
import {auth} from '../config/firebase';

/* CRUD */
import {liveValue} from '../services/crud';

const ChosenEventsView = () => {
  const eventDb = useContext(EventDbContext);
  const [eventJoined, setEventJoined] = useState([]);
  const [eventsCard, setEventsCard] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const userData = useContext(AuthContext);
  // vagy
  const user = auth.currentUser;

  useEffect(() => {
    const liveChange = liveValue('eventAttendees', (snapshot) => {
      setEventJoined(
        Object.entries(snapshot.val())
          .filter((eventArray, index) => {
            return Object.keys(eventArray[1]).includes(user.uid);
          })
          .map((eventKey, index) => {
            return eventKey[0];
          })
      );
    });
    return () => liveChange();
  }, [user]);

  useEffect(() => {
    const filteredArray = eventDb.db.filter((event) => {
      const key = event[0];
      const filteredEventJoined = eventJoined.filter((eventKey) => {
        return key === eventKey;
      });
      return filteredEventJoined.includes(key);
    });
    setEventsCard(filteredArray);
    console.log('filtered arr: ', filteredArray);
  }, [eventDb, user, eventJoined]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <>
      <h1 className='chosen-events-title'>Events joined by Me</h1>
      <div className='chosen-events-container'>
        <div className='chosen-events-sidebar'>
          <img src={joined_event} alt='joined event' className='joined-event-pic' />
        </div>
        <div className='chosen-events-content'>
          {eventsCard.length === 0 ? (
            <div className='chosen-events-message-container'>
              <h3 className='chosen-events-message'>No Events to display!</h3>
            </div>
          ) : (
            <DisplayItems
              isUnsubscribeButton={true}
              filteredDbItems={eventsCard}
              perPage={4}
              setToDefault={() => {}}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChosenEventsView;
