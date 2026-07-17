export const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

export const renderGoogleMapsStatus = (status) => {
  if (status === 'LOADING') {
    return <div className='google-maps-status'>Loading map...</div>;
  }

  if (status === 'FAILURE') {
    return <div className='google-maps-status'>Google Maps could not be loaded.</div>;
  }

  return null;
};
