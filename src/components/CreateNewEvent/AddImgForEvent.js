import {useState} from 'react';
import {storage} from '../../config/firebase';
import {getStorage, ref, uploadBytes, getDownloadURL, } from 'firebase/storage';

const AddImageForEvent = ({setData, data}) => {
  
  const onFileChange = (e) =>{
    console.log(e.target.files);
    setData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
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


  return (
    <div className='add-image-event-container'>
      <h2>Add Image</h2>
      <div className='pic-box'>
        <input type='file' name='image' onChange={onFileChange} />
        {data?.image && <p>You already added: {data?.image.name}</p>}
       {/*  <button type='button' name='upload' onClick={onUploadImage}>
          Upload
        </button>
         */}
      </div>
    </div>
  );
};
export default AddImageForEvent;
