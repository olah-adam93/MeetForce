const EventDetails = ({eventInfo}) => {
  return (
    <div className='event-details-container'>
      <p className='event-details-text'>{eventInfo?.description}</p>
      <div className='event-details-tag-container'>
        <p>Tags</p>
        <span className='event-details-tags'>{eventInfo?.type}</span>
        <span className='event-details-tags'>{eventInfo?.category}</span>
      </div>
    </div>
  );
};
export default EventDetails;
