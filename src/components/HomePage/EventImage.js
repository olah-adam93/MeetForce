import React from 'react';

/* Style */
import './Styles/EventImage.css';

/* Image */
import eventImagePlaceholder from '../../others/logo/logo7.3.png';

const EventImage = ({eventInfo}) => {
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
            <p className='event-image-default'>MeetAtSix</p>
            // <img
            //   className='event-image-default'
            //   src={eventImagePlaceholder}
            //   alt={eventInfo?.title}
            // />
          )}
        </div>
      )}
    </>
  );
};
export default EventImage;
