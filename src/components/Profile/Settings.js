import React, { useContext, useEffect } from 'react';
import { useState, useCallback } from 'react';
import './Style/Settings.css';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import SettingsImage from './SettingsImage';
import { createUserData, updateData } from '../../services/crud';
import { AuthContext } from '../Authentication/AuthContext';

const Settings = ({ setData, data }) => {
  const userData = useContext(AuthContext);
  const [emailChanged, setEmailChanged] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);
  const [birthChanged, setBirthChanged] = useState(false);
  const [gendChanged, setGendChanged] = useState(false);
  const [locChanged, setLocChanged] = useState(false);
  const [orgChanged, setOrgChanged] = useState(false);
  const [telChanged, setTelChanged] = useState(false);
  const [userIntChanged, setUserIntChanged] = useState(false);
  const [nameChangeMessage, setNameChangeMessage] = useState(null);
  const [emailChangeMessage, setEmailChangeMessage] = useState(null);
  const [inputValue, setInputValue] = useState({
    birthday: '',
    gender: '',
    location: '',
    organization: '',
    telephone: '',
    userIntroduction: '',
  });
  const [authInputValue, setAuthInputValue] = useState({
    name: '',
    email: '',
  });

  const auth = getAuth();
  const user = auth.currentUser;
  const userObj = userData.userLog.user;
  const userDetailsObj = userData.userLog.userDetails;

  const authChangeHandler = (e) => {
    setAuthInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeHandler = (e) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputValue);
  };

  const updateProfileName = useCallback(() => {
    if (authInputValue.name !== '') {
      if (authInputValue.name !== userObj.displayName) {
        updateProfile(user, {
          displayName: authInputValue?.name || userObj.displayName,
        })
          .then(() => {
            setNameChanged(true);
            /* setChangeMessage('Nothing changed! Please enter a valid e-mail!'); */
            setNameChangeMessage(`Username changed to ${authInputValue.name}!`);
            setTimeout(() => {
              setNameChanged(false);
            }, 10000);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setNameChanged(true);
        setNameChangeMessage('Nothing changed! Please enter a valid username!');
        setTimeout(() => {
          setNameChanged(false);
        }, 10000);
        return null;
      }
    }
  }, [user, authInputValue.name, userObj.displayName]);

  const updateProfileEmail = useCallback(() => {
    console.log(authInputValue.email);
    console.log(userObj.email);
    if (authInputValue.email !== '') {
      if (authInputValue.email !== userObj.email) {
        updateEmail(user, authInputValue?.email || userObj.email)
          .then(() => {
            setEmailChanged(true);
            /* setChangeMessage('Nothing changed! Please enter a valid e-mail!'); */
            setEmailChangeMessage(`Email address changed to ${authInputValue.email}!`);
            setTimeout(() => {
              setEmailChanged(false);
            }, 10000);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setEmailChanged(true);
        setEmailChangeMessage('Nothing changed! Please enter a valid e-mail!');
        setTimeout(() => {
          setEmailChanged(false);
        }, 10000);
        return null;
      }
    }
  }, [user, authInputValue.email, userObj.email]);

  const authSubmitHandler = (e) => {
    e.preventDefault();

    updateProfileName();
    updateProfileEmail();
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    /*  createUserData(`userDetails/${user.uid}`, {
      birthday: inputValue?.birthday || userDetailsObj.birthday,
      gender: inputValue?.gender || userDetailsObj.gender,
      telephone: inputValue?.telephone || userDetailsObj.telephone,
      userIntroduction: inputValue?.userIntroduction || userDetailsObj.userIntroduction,
    }); */

    updateData('userDetails', user.uid, {
      birthday: inputValue?.birthday || userDetailsObj.birthday,
      gender: inputValue?.gender || userDetailsObj.gender,
      telephone: inputValue?.telephone || userDetailsObj.telephone,
      userIntroduction: inputValue?.userIntroduction || userDetailsObj.userIntroduction,
      location: inputValue?.location || userDetailsObj.location,
      organization: inputValue?.organization || userDetailsObj.organization,
    });

    if (inputValue?.birthday) {
      setBirthChanged(true);
      setTimeout(() => {
        setBirthChanged(false);
      }, 10000);
    }
    if (inputValue?.telephone) {
      setTelChanged(true);
      setTimeout(() => {
        setTelChanged(false);
      }, 10000);
    }
    if (inputValue?.gender) {
      setGendChanged(true);
      setTimeout(() => {
        setGendChanged(false);
      }, 10000);
    }
    if (inputValue?.location) {
      setLocChanged(true);
      setTimeout(() => {
        setLocChanged(false);
      }, 10000);
    }
    if (inputValue?.userIntroduction) {
      setUserIntChanged(true);
      setTimeout(() => {
        setUserIntChanged(false);
      }, 10000);
    }
    if (inputValue?.organization) {
      setOrgChanged(true);
      setTimeout(() => {
        setOrgChanged(false);
      }, 10000);
    }
  };

  return (
    <div className='settings-form-container'>
      <h1>Account Settings</h1>
      <form action='' className='settings-form' onSubmit={authSubmitHandler}>
        <h2 className='section-header user-information'>User Information</h2>
        {/*Name*/}
        <div className='settings-name'>
          <label htmlFor='name' className='label-form label-name'>
            Username
          </label>
          <input
            type='text'
            className='input-name'
            name='name'
            id='name'
            placeholder={userObj.displayName}
            onChange={authChangeHandler}
          />
        </div>
        <div className='edit-msg'>{nameChanged && <p>{nameChangeMessage}</p>}</div>
        {/*Email*/}
        <div className='settings-email'>
          <label htmlFor='email' className='label-form label-email'>
            Email
          </label>
          <input
            type='email'
            className='input-email'
            name='email'
            id='email'
            placeholder={userObj.email}
            onChange={authChangeHandler}
          />
        </div>
        <div className='edit-msg'>{emailChanged && <p>{emailChangeMessage}</p>}</div>
        <button type='submit' className='save-button'>
          Save
        </button>
      </form>
      <form action='' className='settings-form' onSubmit={formSubmitHandler}>
        {/*Image*/}
        <h2 className='section-header profile-picture'>Profile Picture</h2>
        <div className='settings-image-container'>
          <SettingsImage />
        </div>
        {/*Location*/}
        <h2 className='section-header personal-information'>Personal Information</h2>
        <div className='settings-location'>
          <label htmlFor='location' className='label-form label-location'>
            Location
          </label>
          <input
            type='text'
            name='location'
            className='input-location'
            placeholder={userDetailsObj?.location}
            onChange={changeHandler}
            id='location'
          />
        </div>
        <div className='edit-msg'>{locChanged && 'Location changed!'}</div>
        {/*Birthday*/}
        <div className='settings-date'>
          <label htmlFor='date' className='label-form label-date'>
            Birthday
          </label>
          <input
            type='date'
            id='date'
            name='birthday'
            className='input-date'
            onChange={changeHandler}
            //placeholder={userDetailsObj?.birthday}
          />
        </div>
        <div className='edit-msg'>{birthChanged && 'Date of birth changed!'}</div>
        {/*Telephone*/}
        <div className='settings-telephoneNumber'>
          <label htmlFor='telephone' className='label-form label-telephone'>
            Telephone number
          </label>
          <input
            type='tel'
            id='telephone'
            name='telephone'
            className='input-telephone'
            onChange={changeHandler}
            placeholder={userDetailsObj?.telephone || '+00-00-000-0000'}
            pattern='[0-9]{2}[0-9]{2}[0-9]{3}[0-9]{4}'
          />
        </div>
        <div className='edit-msg'>{telChanged && 'Telephone number changed!'}</div>
        {/*Gender*/}
        <div className='settings-gender'>
          <label htmlFor='gender' className='label-form label-gender'>
            Gender
          </label>
          <select
            className='select-gender'
            name='gender'
            id='gender'
            onChange={changeHandler}
            value={userDetailsObj?.gender}
          >
            <option value='0'>Open this select menu</option>
            <option value='female'>Female</option>
            <option value='male'>Male</option>
            <option value='other'>None of these choices</option>
          </select>
        </div>
        <div className='edit-msg'>{gendChanged && 'Gender changed!'}</div>
        {/*Introduction*/}
        <div className='settings-introduction'>
          <label htmlFor='userIntroduction' className='label-form label-introduction'>
            Introduction
          </label>
          <textarea
            id='userIntroduction'
            name='userIntroduction'
            className='textarea-introduction'
            placeholder={userDetailsObj?.userIntroduction}
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className='edit-msg'>{userIntChanged && 'Introduction changed!'}</div>
        <div className='settings-classification'>
          <div className='classification-personal'>
            <input
              name='organization'
              type='radio'
              id='personal'
              value={false}
              onChange={changeHandler}
              defaultChecked={userDetailsObj.organization === 'false'}
            />
            <label className='form-radio-label' htmlFor='personal'>
              Personal
            </label>
          </div>
          {/*Organization*/}
          <div className='classification-organization'>
            <input
              name='organization'
              type='radio'
              id='organization'
              value={true}
              onChange={changeHandler}
              defaultChecked={userDetailsObj.organization === 'true'}
            />
            <label className='form-radio-label' htmlFor='organization'>
              Organization
            </label>
          </div>
        </div>
        <div className='edit-msg'>{orgChanged && 'Organization changed!'}</div>
        <button type='submit' className='save-button'>
          Save
        </button>
      </form>
    </div>
  );
};

export default Settings;
