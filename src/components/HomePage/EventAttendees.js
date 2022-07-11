import { useState, useEffect, useContext } from 'react';

import { storage } from '../../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { AuthContext } from '../Authentication/AuthContext';
import { EventDbContext } from '../EventDbContext/EventDbContext';

/* CRUD */
import { readData } from '../../services/crud';

const EventAttendees = () => {
  const eventDb = useContext(EventDbContext);

  const [attendeesId, setAttendeesId] = useState([]);
  const [attendeesNb, setAttendeesNb] = useState([]);
  const [attendeesNm, setAttendeesNm] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const filteredArray = eventDb.db.filter((event, index) => {
      const key = event[0];
      const value = event[1];
      return setAttendeesId(key);
    });

    readData('eventAttendees', attendeesId).then((snapshot) => {
      setAttendeesNb(Object.keys(snapshot.val() || {}));
    });
    readData('eventAttendees', attendeesId).then((snapshot) => {
      setAttendeesNm(Object.keys(snapshot.val() || {}));
    });
  }, [attendeesId]);
  const getImage = (e) => {
    const fileRef = ref(storage, `eventImages/${user.uid}`);
    uploadBytes(fileRef, data?.image)
      .then((uploadResult) => {
        console.log('first');
        getDownloadURL(uploadResult?.ref)
          .then((value) => {
            setData((prev) => ({ ...prev, imageUrl: value }));
            console.log('second');
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  console.log(attendeesId, attendeesNb, attendeesNm);

  return <></>;
};

export default EventAttendees;
