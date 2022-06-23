import {useState} from 'react';

const SearchMap = ({setCenter, data, setData}) => {
  const geocoder =
    new window.google.maps.Geocoder(); /*Creates a new instance of a Geocoder that sends geocode requests to Google servers. */
  const [address, setAddress] = useState('');

  const onSearch = () => {
    geocoder
      .geocode({address}) /*geocode(request[, callback])
    Parameters: 
      request:  GeocoderRequest
      callback:  function(Array<GeocoderResult> optional, GeocoderStatus): void optional
    Return Value:  Promise<GeocoderResponse>*/
      .then((result) => {
        const firstResult = result[0];
        const location = firstResult.geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        setCenter({lat, lng});
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const changeHandler = (e) => {
    setData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };
  return (
    <>
      <input
        type='text'
        value={data?.location}
        onChange={changeHandler}
        name='location'
        id='location'
      />
      <button onClick={onSearch}>Search</button>
    </>
  );
};
export default SearchMap;
