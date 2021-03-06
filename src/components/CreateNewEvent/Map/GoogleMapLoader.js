import { useState, useEffect, useRef } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import SearchMap from './SearchMap';

const GoogleMapLoader = ({ data, setData, map, setMap }) => {
  const [marker, setMarker] = useState();
  const ref = useRef(null);
  /*useRef is needed to maintain a mutable object
   * that will persist for the lifetime of the component.*/
  const [center, setCenter] = useState({ lat: 47.4979, lng: 19.0402 });
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          mapId: 'f351ed5064543873',
        })
      );
    }
    if (map) {
      map.setOptions({
        zoom: 6,
        center: center,
        mapTypeControl: false,
        streetViewControl: false,
      });
      map.addListener('click', (param) => {
        setData((prev) => ({
          ...prev,
          geoLng: param.latLng.lng(),
          geoLat: param.latLng.lat(),
        }));
        setCenter({ lat: param.latLng.lat(), lng: param.latLng.lng() });
      });
    }
  }, [ref, map]);

  useEffect(() => {
    if (data?.geoLat && data?.geoLng) {
      setMarker(
        new window.google.maps.Marker({
          position: { lat: Number(data?.geoLat), lng: Number(data?.geoLng) },
          map,
          icon: {
            url: 'https://img.icons8.com/doodle/48/000000/google-maps-new.png',
            size: new window.google.maps.Size(32, 32),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 32),
          },
        })
      );
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [center, map, data]);

  console.log(center);

  return (
    <>{<div ref={ref} style={{ height: '50vh', width: '95%', margin: 'auto' }}></div>}</>
  );
};
export default GoogleMapLoader;
