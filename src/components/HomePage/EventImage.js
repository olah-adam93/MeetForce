import React from 'react';

/* Style */
import './Styles/EventImage.css';

const EventImage = ({ eventInfo }) => {
  return (
    <>
      {eventInfo && (
        <div className='event-image-container'>
          {eventInfo?.imageUrl ? (
            <img
              className='event-image-database'
              src={eventInfo?.imageUrl}
              alt={eventInfo?.title}
            />
          ) : (
            <p className='event-image-default'>Meetforce</p>
          )}
        </div>
      )}
    </>
  );
};
export default EventImage;
