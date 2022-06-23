import './Style/MyEventsView.css';
import my_events from '../others/decoration/my_events.svg'
import { useState, useContext, useEffect } from 'react';
import DisplayItems from '../components/SearchEvent/DisplayItems';

/* Database Context */
import { EventDbContext } from '../components/EventDbContext/EventDbContext';

/* AuthContext */
import { getAuth } from '@firebase/auth';
// import { AuthContext } from '../components/Authentication/AuthContext';

const MyEventsView = () => {
  const eventDb = useContext(EventDbContext);

  // const userData = useContext(AuthContext);
  // vagy
  const auth = getAuth();
  const user = auth.currentUser;

  const [eventsCard, setEventsCard] = useState([]);

  useEffect(() => {
    console.log('eventdb: ', eventDb.db);
    console.log(user);

    const filteredArray = eventDb.db.filter((event) => {
      const value = event[1];
      return value?.uid === user?.uid;
    });
    setEventsCard(filteredArray);
    console.log('filtered arr: ', filteredArray);
  }, [eventDb, user]);

  return (
    <>
      <h1 className='my-events-title'>Events Created by Me</h1>
      <div className='my-events-container'>
        <div className='my-events-sidebar'>
          <img src={my_events} alt="my events" className='my-event-pic'/>
        </div>
        <div className='my-events-content'>
          {eventsCard.length === 0 ? (
            <div className='my-events-message-container'>
              <h3 className='my-events-message'>No Events to display!</h3>
            </div>
          ) : (
            <DisplayItems
              filteredDbItems={eventsCard}
              perPage={4}
              setToDefault={() => {}}
              isDeleteButton={true}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MyEventsView;
