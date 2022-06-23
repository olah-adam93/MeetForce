import React, {useCallback} from 'react';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCloudArrowUp} from '@fortawesome/free-solid-svg-icons';
import {storage, auth} from '../../config/firebase';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {getAuth, updateProfile} from 'firebase/auth';
const SettingsImage = () => {
  const [file, setFile] = useState({});

  const user = auth.currentUser;
  const updatePicture = useCallback(() => {
    const fileRef = ref(storage, `userAvatar/${user.uid}`);
    uploadBytes(fileRef, file?.obj)
      .then((uploadResult) => {
        getDownloadURL(uploadResult?.ref)
          .then((value) => {
            updateProfile(user, {
              photoURL: value,
            })
              .then(() => {
                setFile((prev) => ({...prev, imageUrl: value}));
                console.log('fent van', user.photoURL);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, [user, file.obj]);
  const onFileChange = (e) => {
    setFile({obj: e.target.files[0]});
    console.log(e.target.files[0]);
  };
  const deleteAvatar = () => {
    const picRef = ref(storage, `userAvatar/${user.uid}`);
    deleteObject(picRef)
      .then(() => console.log('success'))
      .catch((err) => {
        console.log(err);
      });
    updateProfile(user, {
      photoURL: '',
    }).then(() => setFile({}));
  };
  return (
    <div className='settings-image-container'>
      <div className='settings-image'>
        <div className='avatar-img'>
          <img
            src={
              user?.photoURL ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            alt={user.uid}
          />
        </div>
        {!user?.photoURL && <input type='file' name='photoUrl' onChange={onFileChange} />}
        {!user?.photoURL && (
          <button type='button' name='upload' onClick={updatePicture}>
            Upload
          </button>
        )}
        {user?.photoURL && (
          <button type='button' name='deletAvatar' onClick={deleteAvatar}>
            Delete
          </button>
        )}
        <div>
          <FontAwesomeIcon className='settings-icon' icon={faCloudArrowUp} />
        </div>
      </div>
    </div>
  );
};

export default SettingsImage;
