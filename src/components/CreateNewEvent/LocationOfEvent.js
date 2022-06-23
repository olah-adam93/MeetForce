import {useState, useEffect, useRef} from 'react';
import {Wrapper, Status} from '@googlemaps/react-wrapper';
import GoogleMapLoader from './Map/GoogleMapLoader';
import MapWrapped from './Map/MapWrapped';

const LocationOfEvent = ({setData, data, visible, setVisible}) => {
  const [map, setMap] = useState();
  /* const [visible, setVisible] = useState(false) */

  const changeHandler = (e) => {
    if (e.target.value === 'online') {
      setData((prev) => ({
        ...prev,
        location: '',
        geoLat: '',
        geoLng: '',
        [e.target.name]: e.target.value,
      }));
      setVisible(false);
    } else {
      setData((prev) => ({...prev, [e.target.name]: e.target.value}));
      setVisible(true);
    }
  };

  return (
    <div className='location-container'>
      <h2>Location</h2>
      <div className='location-type'>
        <label htmlFor='venue'>
          Venue*
          <input
            type='radio'
            name='locationType'
            value='venue'
            id='venue'
            onChange={changeHandler}
            defaultChecked={data?.locationType === 'venue'}
          />
        </label>
        <label htmlFor='ticket'>
          Online*
          <input
            type='radio'
            name='locationType'
            value='online'
            onChange={changeHandler}
            id='online'
            defaultChecked={data?.locationType === 'online'}
          />
        </label>
      </div>

      <div>
        <div className={visible ? 'visible' : 'hidden'}>
          <p>Please write the address here</p>
          <label htmlFor='location'> Address</label>
          <input
            type='text'
            value={data?.location}
            name='location'
            id='location'
            onChange={changeHandler}
          />

          <p>Point on the Map</p>

          <br />
          <div className={`map-box `}>
            <MapWrapped data={data} setData={setData} map={map} setMap={setMap} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LocationOfEvent;
