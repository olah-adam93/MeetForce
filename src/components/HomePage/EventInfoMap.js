import {useState, useEffect, useRef} from 'react';
// import {Link} from 'react-router-dom';

/* Style */
import './Styles/EventInfoMap.css';

/* Image */
import eventImagePlaceholder from '../../others/logo/logo7.3.png';

const EventInfoMap = ({eventInfo}) => {
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
        // center: { lat: eventInfo[1]?.geoLat, lng: eventInfo[1]?.geoLng },
        center: {lat: Number(eventInfo?.geoLat), lng: Number(eventInfo?.geoLng)},
        // disableDefaultUI: true,
        mapTypeControl: false,
        streetViewControl: false,
        // gestureHandling: "greedy",
      });
    }
  }, [ref, map, eventInfo]);


  useEffect(() => {
    setInfoWindow(
      new window.google.maps.InfoWindow({
        content: `<div class='google-maps-event-infowindow-container'>
            <div class='google-maps-event-infowindow-img'><img src='${
              eventInfo?.imageUrl ? eventInfo?.imageUrl : eventImagePlaceholder
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
      // console.log('current event:', currentEvent);

      const myMarker = new window.google.maps.Marker({
        position: {lat: Number(eventInfo?.geoLat), lng: Number(eventInfo?.geoLng)},
        map,
        // optimized: true,
        animation: window.google.maps.Animation.DROP,
      })

      setMarker(myMarker);

      myMarker.addListener('click', (param) => {
        // console.log('click on marker', param, event);
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



  return (
    <>
      <div className='goole-maps-event-container' ref={ref}></div>
    </>
  );
};

export default EventInfoMap;
