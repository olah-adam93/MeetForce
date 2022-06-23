/* Style */
import './Styles/EventContainer.css';

import { useEffect, useState, useContext } from 'react';

/* Database Context */
import { EventDbContext } from '../EventDbContext/EventDbContext';

/* Components */
import EventCard from './EventCard';

export default function EventContainer({
  containerName,
  eventCardIndex,
  searchKey,
  searchValue,
}) {
  /* Fetch a firebaseről setDb() */
  const eventDb = useContext(EventDbContext);
  const [eventsCard, setEventsCard] = useState([]);

  useEffect(() => {
    const filteredArray = eventDb.db.filter((event, index) => {
      const key = event[0];
      const value = event[1];
      return value?.[searchKey] === searchValue;
    });
    const dateArray = filteredArray.filter((eventObj) => {
      if (eventObj[1].createdDate) {
        return eventObj[1]?.createdDate;
      } else {
        return null;
      }
    });
    console.log(dateArray);
    const sortedByDateArr = filteredArray.filter((eventObj) => {
      return dateArray.includes(eventObj[1]?.createdDate);
    });

    setEventsCard(sortedByDateArr);
    console.log('valami');
  }, [eventDb.db, searchKey, searchValue]);

  return (
    <>
      <h2 className='event-container-name'>{containerName}</h2>
      <br />
      <div className='main_event_container'>
        {eventsCard.map((event, index) => {
          if (index < 4) {
            return (
              <EventCard
                eventCard={event[1]}
                eventId={event[0]}
                key={`card_${event[0]}`}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <br />
    </>
  );
}
