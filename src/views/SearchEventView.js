import {useCallback, useEffect, useState, useContext} from 'react';

/* Style */
import './Style/SearchEventView.css';

/* Components */
import FilterBar from '../components/SearchEvent/FilterBar';
import DisplayItems from '../components/SearchEvent/DisplayItems';
import MapComponent from '../components/SearchEvent/MapComponent';

/* Database Context */
import {EventDbContext} from '../components/EventDbContext/EventDbContext';

/* Google Maps */
import {Wrapper} from '@googlemaps/react-wrapper';
import EventCard from '../components/HomePage/EventCard';

const SearchEventView = () => {
  const eventDb = useContext(EventDbContext);
  const [eventsCard, setEventsCard] = useState([]);
  const [toDefault, setToDefault] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterParams, setFilterParams] = useState({
    location: '', // locationType
    price: '', // panymentType
    date: '', // eventStarts
    type: '', // type
    category: '', // category
  });

  const searchFunction = useCallback(
    (eventDb) => {
      return eventDb.filter((event) => {
        const value = event[1];

        const filterTitleResult =
          value?.title &&
          (value?.location || value?.location === '') &&
          value?.type &&
          value?.category &&
          (value?.title.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) >
            -1 ||
            value?.location.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) >
              -1 ||
            value?.type.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) >
              -1 ||
            value?.category.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) >
              -1);

        const filterLocationResult =
          value?.locationType &&
          value?.locationType
            .toString()
            .toLowerCase()
            .indexOf(filterParams?.location.toLowerCase()) > -1;

        const filterPriceResult =
          value?.paymentType &&
          value?.paymentType
            .toString()
            .toLowerCase()
            .indexOf(filterParams?.price.toLowerCase()) > -1;

        const filterDateResult =
          value?.eventStarts &&
          value?.eventStarts
            .toString()
            .toLowerCase()
            .indexOf(filterParams?.date.toLowerCase()) > -1;

        const filterTypeResult =
          value?.type &&
          value?.type.toString().toLowerCase().indexOf(filterParams?.type.toLowerCase()) >
            -1;

        const filterCategoryResult =
          value?.category &&
          value?.category
            .toString()
            .toLowerCase()
            .indexOf(filterParams?.category.toLowerCase()) > -1;

        return (
          filterTitleResult &&
          filterLocationResult &&
          filterPriceResult &&
          filterDateResult &&
          filterTypeResult &&
          filterCategoryResult
        );
      });
    },
    [searchQuery, filterParams]
  );

  useEffect(() => {
    console.log(eventDb.db);
    console.log(eventsCard);
  }, [eventsCard, eventDb]);

  useEffect(() => {
    // setEventsCard(
    //   searchFunction(eventDb.db).sort((a, b) => {
    //     return (
    //       new Date(b[1].createdDate).getTime() - new Date(a[1].createdDate).getTime()
    //     );
    //   })
    // );

    const result = searchFunction(eventDb.db).sort((a, b) => {
      return new Date(b[1].createdDate).getTime() - new Date(a[1].createdDate).getTime();
    });
    setEventsCard(result);
  }, [eventDb, searchFunction]);

  return (
    <div className='search-event-container'>
      <FilterBar
        setSearchQuery={setSearchQuery}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        setToDefault={setToDefault}
      />

      <div className='search-event-inner-container'>
        <div className='display-maps-container'>
          <Wrapper apiKey={'AIzaSyD9MpMtp9BcSlZgMy26wtaaamLbfOQhu8s'}>
            <MapComponent eventInfo={eventsCard} />
          </Wrapper>
        </div>

        <DisplayItems
          filteredDbItems={eventsCard}
          perPage={8}
          toDefault={toDefault}
          setToDefault={setToDefault}
        />
      </div>
    </div>
  );
};

export default SearchEventView;
