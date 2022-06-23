const NewEventDescription = ({ setData, data }) => {
  const changeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className='new-event-description'>
      <h2>Description of the Event</h2>
      <textarea name='description' placeholder='Write here...' onChange={changeHandler} value={data?.description}/>
    </div>
  );
};
export default NewEventDescription;
