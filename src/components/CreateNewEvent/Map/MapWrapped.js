import {Wrapper, Status} from '@googlemaps/react-wrapper';
import GoogleMapLoader from './GoogleMapLoader';

/* const render = (status) => {
  if (status === Status.LOADING) return "Loading...";
  if (status === Status.FAILURE) return "Error";
  return null;
} */

const MapWrapped = ({setData, data, map, setMap}) => {
  return (
    <Wrapper apiKey={'AIzaSyD9MpMtp9BcSlZgMy26wtaaamLbfOQhu8s'} /* render ={render} */>
      <GoogleMapLoader data={data} setData={setData} map={map} setMap={setMap} />
    </Wrapper>
  );
};
export default MapWrapped;
