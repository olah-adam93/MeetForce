import { useState } from 'react';
import { storage } from '../../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddImageForEvent = ({ setData, data }) => {
  const onFileChange = (e) => {
    console.log(e.target.files);
    setData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  return (
    <div className='add-image-event-container'>
      <h2>Add Image</h2>
      <div className='pic-box'>
        <input type='file' name='image' onChange={onFileChange} />
        {data?.image && <p>You already added: {data?.image.name}</p>}
      </div>
    </div>
  );
};
export default AddImageForEvent;
