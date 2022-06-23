/*React*/
import { useEffect, useState } from 'react';
import { storage } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
/*Components */
import BasicInfoForm from '../components/CreateNewEvent/BasicInfoForm';
import LocationOfEvent from '../components/CreateNewEvent/LocationOfEvent';
import NewEventInfo from '../components/CreateNewEvent/NewEventInfo';
import NewEventPayment from '../components/CreateNewEvent/NewEventPayment';
import TimeOfEvent from '../components/CreateNewEvent/TimeOfEvent';
import { createNewData } from '../services/crud';
import { getAuth } from '@firebase/auth';
import { useNavigate } from 'react-router';
/*Style */
import './Style/CreateEventView.css';
import { async } from '@firebase/util';

const CreateEventView = () => {
  const navigateTo = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const [missingData, setMissingData] = useState(false);
  const [data, setData] = useState({
    uid: user.uid,
    title: '',
    organizer: '',
    /* attendant: undefined, */
    location: '',
    organizer: user.displayName,
    organizerEmail: user.email,
  });
  const [locationtype, setLocationType] = useState('');
  const [nextbtn, setNextBtn] = useState(0);
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    console.log(data);
  }, [data]);
  const nextFormPageHandler = (e) => {
    e.preventDefault();
    if (nextbtn === 0) {
      if (
        !data.title ||
        !data.locationType ||
        !data.eventStarts || //itt vizsgálja hogy a múltban jönne létre?
        !data.eventEnds ||
        !data.startTime ||
        !data.endTime ||
        !data.type ||
        !data.category||
        data.attendant < 0 ||
        Number(new Date(data.eventStarts)) > Number(new Date(data.eventEnds)) 
        //Number(new Date(data.eventStarts)) === Number(new Date(data.eventEnds)) && data.startTime data.endTime
        
        //attendant ne lehessen - eredmény
      ) {
        setMissingData(true);
        setTimeout(() => {
          setMissingData(false);
        }, 8000);
      } else if (nextbtn < 3) {
        setNextBtn((prev) => (prev += 1));
      }
    } else if (nextbtn === 1) {
      setNextBtn((prev) => (prev += 1));
    } else if (nextbtn === 2) {
      if (!data.paymentType) {
        setMissingData(true);
        setTimeout(() => {
          setMissingData(false);
        }, 8000);
      } else if (nextbtn < 3) {
        setNextBtn((prev) => (prev += 1));
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  const backFormPageHandler = (e) => {
    e.preventDefault();
    if (nextbtn > 0) {
      setNextBtn((prev) => (prev -= 1));
    }
  };
  /*  const onUploadImage = (e) => {
    const fileRef = ref(storage, `eventImages/${data?.image.name}`)
    uploadBytes(fileRef, data?.image)
    .then((uploadResult) =>{console.log("first");
      getDownloadURL(uploadResult?.ref)
      .then((value) => {setData((prev) => ({ ...prev, imageUrl: value }));
      console.log("second")
    })
      .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
  } */
  const submitHandler = (e) => {
    e.preventDefault();
    
    if (
      !data.title ||
      !data.locationType ||
      !data.eventStarts || //itt vizsgálja hogy a múltban jönne létre?
      !data.eventEnds ||
      !data.startTime ||
      /* Number(new Date(data.eventStarts)) < Number(new Date(data.eventEnds)) || */
      !data.paymentType ||
      data.paymentType === "ticket" && !data.ticketPrice||
      !data.endTime
      //attendant ne lehessen - eredmény
    ) {
      setMissingData(true);
      setTimeout(() => {
        setMissingData(false);
      }, 8000);
    } else {
      const currentDate = new Date(Date.now()).toUTCString().slice(-24, -4);
      console.log(currentDate);
      if(data?.image){

        const fileRef = ref(storage, `eventImages/${data?.image.name}`)
        uploadBytes(fileRef, data?.image)
        .then((uploadResult) =>{console.log("first");
          getDownloadURL(uploadResult?.ref)
          .then((value) => {
            //setData((prev) => ({ ...prev, imageUrl: value }));
            createNewData('events', { ...data, createdDate: currentDate, imageUrl: value })
          })
        })
      } else{
        createNewData('events', { ...data, createdDate: currentDate })
      }
      //createNewData('events', { ...data, createdDate: currentDate })
      
      /* createNewData('events', data) */
      setData({});
      console.log('done');
      navigateTo('/create-success');
    }
  };
  return (
    <div className='create-new-event-container'>
      <h1>Create New Event</h1>
      {missingData && (
        <h1 className='missing-data'>Missing data! Please fill out every required field!</h1>
      )}
      <div className='new-event-form'>
        <form action='' onSubmit={submitHandler}>
          {nextbtn === 0 && (
            <div className='basic-event-info'>
              <BasicInfoForm setData={setData} data={data} />

              <TimeOfEvent setData={setData} data={data} />

              <LocationOfEvent
                setData={setData}
                data={data}
                visible ={visible}
                setVisible={setVisible}
              />
              {/*search location , click-et kijavítani, Vissza Gomb*/}
            </div>
          )}
          {nextbtn === 1 && (
            <div className='new-event-details'>
              <NewEventInfo setData={setData} data={data} />
            </div>
          )}
          {nextbtn === 2 && (
            <div className='new-event-payment'>
              <NewEventPayment setData={setData} data={data} />
            </div>
          )}

          <div className='btn-container'>
            {nextbtn > 0 && (<>
              <button type='button' onClick={backFormPageHandler} className='back-btn'>
                Back
              </button>
              
              </>
            )}
            {nextbtn < 2 && (<>
              <button type='button' onClick={nextFormPageHandler} className='next-btn'>
                Next
              </button>
              </>
            )}
            {nextbtn === 2 && (<>
              <button type='submit' className='save-btn'>
                Save event
              </button>
              </>
            )}
            <h3 className='required'>*: required</h3>
            
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateEventView;
