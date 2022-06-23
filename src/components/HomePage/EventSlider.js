/* Style */
import './Styles/EventSlider.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {useEffect, useState, useContext} from 'react';

/* Database Context */
import {EventDbContext} from '../EventDbContext/EventDbContext';

/* Components */
import EventCard from './EventCard';

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation} from 'swiper';

export default function EventSlider({containerName, searchKey, searchValue}) {
  const eventDb = useContext(EventDbContext);
  const [eventsCard, setEventsCard] = useState([]);

  useEffect(() => {
    const filteredArray = eventDb.db.filter((event) => {
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
    
    // console.log('datearr: ', dateArray);

    const sortedByDateArr = dateArray.sort((a, b) => {
      return new Date(b[1].createdDate).getTime() - new Date(a[1].createdDate).getTime();
    });

    setEventsCard(sortedByDateArr);
  }, [eventDb.db, searchKey, searchValue]);

  return (
    <>
      <div className='event-slider-container'>
        <h2 className='slider-container-name'>{containerName}</h2>
        <Swiper
          slidesPerView={4}
          // spaceBetween={0}
          loop={false}
          navigation={false}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 6,
          }}
          modules={[Pagination, Navigation]}
          className='swiper'
        >
          {eventsCard.map((event) => {
            return (
              <SwiperSlide key={`card_${event[0]}`}>
                <EventCard
                  eventCard={event[1]}
                  eventId={event[0]}
                  eventSearchStyle={false}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
