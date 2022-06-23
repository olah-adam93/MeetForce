import GaleryImage from './GaleryImage';
import './Style/GaleryContainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import {getStorage, ref, uploadBytes, getDownloadURL, push} from 'firebase/storage';
import {storage} from '../../config/firebase';
const GaleryContainer = () => {
  const [galeryImg, setGaleryImg] = useState({});
  const [galery, setGalery] = useState({})
  const authCont = useContext(AuthContext)
  /*fetch*/
  const images = [
    {
      id: 0,
      title: 'nev1',
      url: 'http://placekitten.com/250/200',
    },
    {
      id: 1,
      title: 'nev2',
      url: 'http://placekitten.com/250/200',
    },
    {
      id: 2,
      title: 'nev3',
      url: 'http://placekitten.com/250/200',
    },
    {
      id: 3,
      title: 'nev4',
      url: 'http://placekitten.com/250/200',
    },
    {
      id: 4,
      title: 'nev5',
      url: 'http://placekitten.com/250/200',
    }
  ];
  const changeUploade = (e) => {
    setGaleryImg((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }))
  }
  const onUploadImage = (e) => {
    const fileRef = ref(storage, `galery/${authCont.userLog.uid}`)
    uploadBytes(fileRef, galeryImg?.image)
    .then((uploadResult) =>{console.log("first");
      getDownloadURL(uploadResult?.ref)
      .then((value) => {setGalery((prev) => ({ ...prev, imageUrl: value }));
      console.log("second")
    })
      .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
  }
  return (
    <div className='galery-container'>
      <h3>Galery</h3>
      <FontAwesomeIcon icon={faCirclePlus} className="add-image" />
      <div className='galery-container-flex'>
        {images &&
          images.map((pic, index) => {
            if (images.length < 8) {
              if (index < 4) {
                return <GaleryImage pic={pic} key={`galery_img_${index}`}/>;
              }
            }
            if (images.length >= 8) {
              if (index < 8) {
                return <GaleryImage pic={pic} key={`galery_img_${index}`}/>;
              }
            }
            return null;
          })}
      </div>
    </div>
  );
};
export default GaleryContainer;
