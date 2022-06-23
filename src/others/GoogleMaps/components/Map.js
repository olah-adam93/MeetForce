import { useState, useEffect, useRef } from 'react';

const Map = ({ eventInfo }) => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [infoWindow, setInfoWindow] = useState();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }

    if (map) {
      map.setOptions({
        zoom: 10,
        center: { lat: eventInfo?.geoLat, lng: eventInfo?.geoLng },
      });
    }
  }, [ref, map]);

  useEffect(() => {
    if (!marker && map) {
      setMarker(
        new window.google.maps.Marker({
          position: { lat: eventInfo?.geoLat, lng: eventInfo?.geoLng },
          map,
          icon: {
            url: 'https://img.icons8.com/doodle/48/000000/google-maps-new.png',
            size: new window.google.maps.Size(32, 32),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(0, 32),
          },
        })
      );
    }
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker, map]);

  useEffect(() => {
    if (!infoWindow && map) {
      setInfoWindow(
        new window.google.maps.InfoWindow({
          content: `<div className='event-map-popup-content'>
          ${eventInfo?.title}</br>
          ${eventInfo?.eventStarts}: ${eventInfo?.startTime} - ${eventInfo?.eventEnds}: ${eventInfo?.endTime}
          </div>`,
        })
      );
    }
  }, [infoWindow, map]);

  const clickHandler = () => {
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  };

  return <div className='event-map-container' ref={ref} onClick={clickHandler}></div>;
};

export default Map;
