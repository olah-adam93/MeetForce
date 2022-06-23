import AddImageForEvent from './AddImgForEvent';
import NewEventDetails from './NewEventDescription';

const NewEventInfo = ({ setData, data, imageUrl, setImageUrl }) => {

  return (
    <div className='new-event-info-container'>
      <AddImageForEvent setData={setData} data ={data} />
      <NewEventDetails setData={setData} data ={data}/>
    </div>
  );
};
export default NewEventInfo;
