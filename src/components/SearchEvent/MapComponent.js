import { useState, useEffect, useRef } from 'react';

/* Style */
import './Style/MapComponent.css';

/* Image */
import meetforce_logo from '../CreateNewEvent/Map/meetforce_logo.JPG';

const MapComponent = ({ eventInfo }) => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const ref = useRef(null);

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
        zoom: 6.5,
        center: { lat: 47.162494, lng: 19.503304 },
        mapTypeControl: false,
        streetViewControl: false,
      });
    }
  }, [ref, map]);

  /* Filter */
  useEffect(() => {
    if (ref.current) {
      setMap(
        new window.google.maps.Map(ref.current, {
          mapId: 'f351ed5064543873',
        })
      );
      setMarker(null);
    }
  }, [eventInfo, ref]);

  useEffect(() => {
    if (!marker && map && eventInfo?.length > 0) {
      eventInfo.map((event) => {
        const [key, value] = event;

        const newMarker = new window.google.maps.Marker({
          position: { lat: Number(value?.geoLat), lng: Number(value?.geoLng) },
          map,
          optimized: true,
          animation: window.google.maps.Animation.DROP,
        });

        const infowindow = new window.google.maps.InfoWindow({
          content: `<div class='google-maps-infowindow-container'>
            <a class='google-maps-infowindow-link' href='/eventpage/${key}'>
            <div class='google-maps-infowindow-img'><img src='${
              value?.imageUrl ? value?.imageUrl : meetforce_logo
            }' alt=''></div>
            <div class='google-maps-infowindow-content-'>
              <div class='google-maps-infowindow-title'>${
                value?.title.length > 45
                  ? value?.title.slice(0, 45) + '...'
                  : value?.title
              }</div>
              <div class='google-maps-infowindow-date'>${
                new Date(value?.eventStarts).toDateString() + ' - ' + value?.startTime
              }</div>
            </div>
            </a>
          </div>`,
        });

        newMarker.addListener('click', (param) => {
          infowindow.open({
            anchor: newMarker,
            map,
            shouldFocus: false,
          });
        });

        return setMarker(newMarker);
      });

      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }
  }, [marker, map, eventInfo]);

  return <>{<div className='goole-maps-search-container' ref={ref}></div>}</>;
};

export default MapComponent;
