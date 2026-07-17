import {Wrapper} from '@googlemaps/react-wrapper';
import GoogleMapLoader from './GoogleMapLoader';
import {googleMapsApiKey, renderGoogleMapsStatus} from '../../../config/googleMaps';

const MapWrapped = ({setData, data, map, setMap}) => {
  return (
    <Wrapper apiKey={googleMapsApiKey} render={renderGoogleMapsStatus}>
      <GoogleMapLoader data={data} setData={setData} map={map} setMap={setMap} />
    </Wrapper>
  );
};
export default MapWrapped;
