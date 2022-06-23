import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
//import Validation from './Validation';
import { AuthContext } from '../Authentication/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

import './SignIn.css';

const SignIn = ({ submitForm }) => {
  const authContext = useContext(AuthContext);

  const [data, setData] = useState({
    e_mail: '',
    passw: '',
  });

  const [error, setError] = useState({});

  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    //console.log(data);
    setError({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setError(validate(data));

    signInWithEmailAndPassword(auth, data.e_mail, data.passw)
      .then((authCredential) => {
        // Sikeres volt a belepes a usernek
        console.log('user', authCredential.user);
        authContext.setUserLog((prev) => ({ ...prev, user: auth.currentUser }));
        navigateTo('/profile');
      })
      .catch((e) => {
        switch (e.message) {
          case 'Firebase: Error (auth/user-not-found).':
            setError({
              authError: 'Invalid email or password!',
            });
            break;
          default:
        }
        //console.log(e.message);
      });
  };

  // Validation

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
    return errors;
  };

  return (
    <div className='sign-in-container'>
      <form onSubmit={handleFormSubmit}>
        {/* <img
          className='header-logo-img'
          src={require('../../others/logo/meetatsix100.406.szines2.png')}
          alt='logo'
        /> */}
        <div className='sign-in-header'>
          <h3> Sign In </h3>
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
          {error.e_mail ? (
            <p className='error-msg'>{error.e_mail}</p>
          ) : (
            <p className='error-msg'>{error?.authError}</p>
          )}
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
          {error.passw ? (
            <p className='error-msg'>{error.passw}</p>
          ) : (
            <p className='error-msg'>{error?.authError}</p>
          )}
        </div>
        <button className='submit'>Sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
