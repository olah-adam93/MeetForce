import { useState, useEffect, useContext } from 'react';
import { readData } from '../../services/crud';
import { AuthContext } from '../Authentication/AuthContext';

const BasicInfoForm = ({ setData, data }) => {
  const userData = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState();
  const [type, setType] = useState([]);
  useEffect(() => {
    readData('eventCategories')
      .then((snapshot) => setCategory(Object.entries(snapshot.val())))
      .catch((e) => console.log(e));
    readData('eventTypes')
      .then((snapshot) => setType(Object.entries(snapshot.val())))
      .catch((e) => console.log(e));
  }, []);
  const changeCheckedHandler = (e) => {
    if (e.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };
  const changeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className='basic-info-box'>
      <h2>Basic Information</h2>
      <p>Create a new event with these information </p>
      <label htmlFor='title-of-event'>Event title*</label>
      <input
        type='text'
        id='title-of-event'
        name='title'
        onChange={changeHandler}
        value={data?.title}
      />
      <label htmlFor='organizer-of-event'>Event organizer</label>
      <input
        type='text'
        id='organizer-of-event'
        name='organizer'
        onChange={changeHandler}
        value={userData.userLog.user.displayName}
      />
      <label htmlFor='event-category'>Event category*</label>
      <select name='type' onChange={changeHandler} value={data?.type}>
        <option value="">Choose a type</option>
        {type?.map((eventType, index) => {
          const key = eventType[0];
          const value = eventType[1];
          return (
            <option value={key} key={`eventType_${key}`}>
              {value}
            </option>
          );
        })}
      </select>
      <select name='category' onChange={changeHandler} value={data?.category}>
        <option value="" >Choose a category</option>
        {category?.map((eventCategory, index) => {
          const key = eventCategory[0];
          const value = eventCategory[1];
          return (
            <option value={key} key={`eventCategory_${key}`}>
              {value}
            </option>
          );
        })}
      </select>
      {/* <label htmlFor='addendantLimit'>Attendant limit</label>
      <input
        type='checkbox'
        name='addendantLimit'
        id='addendant-limit'
        onChange={changeHandler}
        value={checked}
        onClick={changeCheckedHandler}
        defaultValue={data?.addendantLimit}
      /> */}
      {/* {checked && ( */}
        <div>
          <label htmlFor='attendant-number-limit'>Attendant limit number</label>
          <input
            type='number'
            id='attendant-number-limit'
            name='attendant'
            onChange={changeHandler}
            value={data?.attendant}
            min= "0"
          />
        </div>
      {/* )} */}
    </div>
  );
};
export default BasicInfoForm;
