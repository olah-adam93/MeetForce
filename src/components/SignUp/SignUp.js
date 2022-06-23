import React, { useCallback, useContext, useState } from 'react';
import Validation from './Validation';
import { AuthContext } from '../Authentication/AuthContext';

import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { createUserData } from '../../services/crud';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPerson,
  faEnvelope,
  faLock,
  faLocationDot,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';

import './SignUp.css';

const SignUp = ({ submitForm }) => {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState({
    nam: '',
    e_mail: '',
    passw: '',
    loc: '',
    organization: '',
  });

  const [error, setError] = useState({});
  const [correctData, setCorrectData] = useState(false);
  const navigateTo = useNavigate();

  const handleChange = useCallback(
    (e) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });

      /*if (data?.nam && data?.e_mail && data?.passw && data?.passw.length > 5) {
        setCorrectData(true);
      } */
      setError({});
      setCorrectData(false);
    },
    [data]
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(validate(data));

    //console.log(correctData);
    // if (correctData) {
    createUserWithEmailAndPassword(auth, data.e_mail, data.passw)
      .then((authCredential) => {
        // Sikeres volt a regisztracio
        console.log('user', authCredential.user);
        console.log('user', auth?.currentUser);
      })
      .then(() => {
        /* const auth = getAuth(); */
        const user = auth.currentUser;
        if (user.uid) {
          updateProfile(user, {
            displayName: data.nam,
          })
            .then(() => {
              console.log(user.displayName);
            })
            .catch((error) => {
              console.log(error);
            });
          createUserData(`userDetails/${user.uid}`, {
            location: data.loc,
            organization: false,
          });
        }
      })
      .then(() => {
        /* const auth = getAuth(); */
        const user = auth.currentUser;
        authContext.setUserLog((prev) => ({ ...prev, user: user }));
        navigateTo('/thankyou');
      })
      .catch((e) => console.log(e));
    //}
    setCorrectData(true);
  };

  // useEffect(() => {
  //   if (Object.keys(error).length === 0 && correctData) {
  //     submitForm(true);
  //   }
  // }, [error, correctData, submitForm]);

  // Validation

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!data.nam) {
      errors.nam = 'Name cannot be blank!';
    }
    if (!data.e_mail) {
      errors.e_mail = 'Email cannot be blank!';
    } else if (!regex.test(data.e_mail)) {
      errors.e_mail = 'This is not a valid email format!';
    }
    if (!data.passw) {
      errors.passw = 'Password cannot be blank!';
    } else if (data.passw.length < 5) {
      errors.passw = 'Password must be more than 5 characters!';
    } else if (data.passw.length > 10) {
      errors.passw = 'Password cannot be more than 10 characters!';
    }
    if (!data.loc) {
      errors.loc = 'Location cannot be blank!';
    }
    if (!data.organization) {
      errors.organization = 'Please choose from the given options!';
    }
    return errors;
  };

  return (
    <div className='sign-up-container'>
      <form onSubmit={handleFormSubmit}>
        {/* <img
          className='header-logo-img'
          src={require('../../others/logo/meetatsix100.406.szines2.png')}
          alt='logo'
        /> */}
        <div className='sign-up-header'>
          <h3> Sign Up </h3>
        </div>
        {Object.keys(error).length === 0 && correctData ? (
          <h4 className='signUp-success-msg'>Signed up successfully!</h4>
        ) : null}
        <div className={`name-container${error.nam ? ' shake' : ''}`}>
          <label className='name-label'>Name</label>
          <div className='name-field'>
            <input
              className='input'
              type='text'
              name='nam'
              value={data.nam}
              onChange={handleChange}
            />
            <FontAwesomeIcon className='icon-person' icon={faPerson} />
            {error.nam ? (
              <FontAwesomeIcon className='icon-error' icon={faCircleExclamation} />
            ) : null}
          </div>
          <p className='error-msg'>{error.nam}</p>
        </div>
        <div className={`mail-container${error.e_mail ? ' shake' : ''}`}>
          <label className='mail-label'>Email</label>
          <div className='mail-field'>
            <input
              className='input'
              type='text'
              name='e_mail'
              autoComplete='username'
              value={data.e_mail}
              onChange={handleChange}
            />
            <FontAwesomeIcon className='icon-envelope' icon={faEnvelope} />
            {error.e_mail ? (
              <FontAwesomeIcon className='icon-error' icon={faCircleExclamation} />
            ) : null}
          </div>
          <p className='error-msg'>{error.e_mail}</p>
        </div>
        <div className={`password-container${error.passw ? ' shake' : ''}`}>
          <label className='password-label'>Password</label>
          <div className='password-field'>
            <input
              className='input'
              type='password'
              name='passw'
              autoComplete='current-password'
              value={data.passw}
              onChange={handleChange}
            />
            <FontAwesomeIcon className='icon-lock' icon={faLock} />
            {error.passw ? (
              <FontAwesomeIcon className='icon-error' icon={faCircleExclamation} />
            ) : null}
          </div>
          <p className='error-msg'>{error.passw}</p>
        </div>
        <div className={`location-signup-container${error.loc ? ' shake' : ''}`}>
          <label className='location-label'>Location</label>
          <div className='location-field'>
            <input
              className='input'
              type='text'
              name='loc'
              value={data.loc}
              onChange={handleChange}
            />
            <FontAwesomeIcon className='icon-location' icon={faLocationDot} />
            {error.loc ? (
              <FontAwesomeIcon className='icon-error' icon={faCircleExclamation} />
            ) : null}
            <p className='error-msg'>{error.loc}</p>
          </div>
        </div>
        <div className='classification-container'>
          <div className='classification-field'>
            <input
              name='organization'
              type='radio'
              id='personal'
              value={false}
              onChange={handleChange}
            />
            <label className='classification-label' htmlFor='personal'>
              Personal
            </label>
          </div>
          <div className='classification-field'>
            <input
              name='organization'
              type='radio'
              id='organization'
              value={true}
              onChange={handleChange}
            />
            <label className='classification-label' htmlFor='organization'>
              Organization
            </label>
          </div>
        </div>
        <div className='classification-msg'>
          <p className='error-msg'>{error.organization}</p>
        </div>
        <button className='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
