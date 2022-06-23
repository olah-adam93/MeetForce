const TimeOfEvent = ({setData, data}) => {
  const changeHandler = (e) => {
    setData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };
  return (
    <div className='time-of-event'>
      <h2>Time of the Event</h2>
      {/*single event, recurring */}
      {/* <div className='event-frequency'>
        <label htmlFor='single'>Single</label>
        <input
          type='radio'
          name='eventFrequency'
          value='single'
          id='single'
          onChange={changeHandler}
          defaultChecked={data?.eventFrequency === 'single'}
        />
        <label htmlFor='recurring'>Recurring</label>
        <input
          type='radio'
          name='eventFrequency'
          value='recurring'
          onChange={changeHandler}
          id='recurring'
          defaultChecked={data?.eventFrequency === 'recurring'}
        />
      </div> */}
      <div className='event-time-box'>
        <div>
          <label htmlFor='event-starts'>Event Starts*
          <input
            type='date'
            id='event-starts'
            name='eventStarts'
            onChange={changeHandler}
            value={data?.eventStarts}
          /></label>
          <label htmlFor='start-time'>Start Time*
          <input
            type='time'
            id='start-time'
            name='startTime'
            onChange={changeHandler}
            value={data?.startTime}
          /></label>
        </div>
        <div>
          <label htmlFor='event-ends'>Event Ends*
          <input
            type='date'
            id='event-ends'
            name='eventEnds'
            onChange={changeHandler}
            value={data?.eventEnds}
          /></label>
          <label htmlFor='end-time'>End time*
          <input
            type='time'
            id='end-time'
            name='endTime'
            onChange={changeHandler}
            value={data?.endTime}
          /></label>
        </div>
      </div>
      {/*event start, end */}
    </div>
  );
};
export default TimeOfEvent;
