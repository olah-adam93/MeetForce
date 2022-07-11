import { useState, useEffect, useRef } from 'react';

/* Style */
import './Styles/EventInfoMap.css';

const EventInfoMap = ({ eventInfo }) => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [infoWindow, setInfoWindow] = useState();
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
        zoom: 8,
        center: { lat: Number(eventInfo?.geoLat), lng: Number(eventInfo?.geoLng) },
        mapTypeControl: false,
        streetViewControl: false,
      });
    }
  }, [ref, map, eventInfo]);

  useEffect(() => {
    setInfoWindow(
      new window.google.maps.InfoWindow({
        content: `<div class='google-maps-event-infowindow-container'>
            <div class='google-maps-event-infowindow-img'><img src='${
              eventInfo?.imageUrl ? eventInfo?.imageUrl : null /*eventImagePlaceholder*/
            }' alt=''></div>
            <div class='google-maps-event-infowindow-content-'>
              <div class='google-maps-event-infowindow-title'>${
                eventInfo?.title.length > 45
                  ? eventInfo?.title.slice(0, 45) + '...'
                  : eventInfo?.title
              }</div>
              <div class='google-maps-event-infowindow-date'>${
                new Date(eventInfo?.eventStarts).toDateString() +
                ' - ' +
                eventInfo?.startTime
              }</div>
            </div>
          </div>`,
      })
    );
  }, [eventInfo]);

  useEffect(() => {
    if (!marker && map) {
      const myMarker = new window.google.maps.Marker({
        position: { lat: Number(eventInfo?.geoLat), lng: Number(eventInfo?.geoLng) },
        map,
        animation: window.google.maps.Animation.DROP,
      });

      setMarker(myMarker);

      myMarker.addListener('click', (param) => {
        infoWindow.open({
          anchor: myMarker,
          map,
          shouldFocus: false,
        });
      });

      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }
  }, [marker, map, eventInfo, infoWindow]);

  return <>{<div className='goole-maps-event-container' ref={ref}></div>}</>;
};

export default EventInfoMap;
