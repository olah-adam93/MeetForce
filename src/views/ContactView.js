import './Style/ContactsView.css';
import {useState} from 'react';
import React from 'react';
import {createNewData} from '../services/crud';
import new_mail from '../others/decoration/new_mail.svg'
import admin from '../others/decoration/admin.svg'
import femaleAvatar from '../others/decoration/female_avatar.svg'
import maleAvatar from '../others/decoration/male_avatar.svg'
const ContactView = () => {
  const [contactInfo, setContactInfo] = useState({
    contactName: '',
    title: '',
    theme: '',
    email: '',
    contactMessage: '',

  });
  const [required, setRequired] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const changeContactHandler = (e) => {
    setContactInfo((prev) => ({...prev, [e.target.name]: e.target.value}));
  };
  const submitContactHandler = (e) => {
    e.preventDefault();

    if (
      !contactInfo.email ||
      !contactInfo.contactName ||
      !contactInfo.contactMessage ||
      !contactInfo.theme ||
      !contactInfo.title
    ) {
      setRequired('requiredInformation');
    } else {
      console.log(contactInfo);
      setRequired('');
      const currentDate = new Date(Date.now()).toUTCString().slice(-24, -4);
      createNewData(`contactMessages/${contactInfo.theme}`, {
        ...contactInfo,
        createdDate: currentDate,
      });
      setContactInfo({
        contactName: '',
        title: '',
        theme: '',
        email: '',
        contactMessage: '',
      });
    }
    setModalOpen(true)
  };
  const closeModal =(e) =>{
    setModalOpen(false)
  }
  return (
    <div className='contact-container'>
      {modalOpen && (
        <div className='display-modal-container'>
          <div className='display-modal-content'>
            <h3>You have successfully sent the message!</h3>
            <div>
              <button onClick={closeModal} className="close-btn">Close</button>
            </div>
          </div>
        </div>
      )}
      <h2>Contact Information</h2>
      <div className='contact-details'>
        <div className='contact-body-container'>
          <div className="admin-header">
            <h3 className='contact-title'>Admins</h3>
            <img src ={admin} alt="admins-img" className='admin-icon'/>
          </div>
          <div className='contact-admin-paragraph'>
            <div className='contact-div-box'>
              <div className='contact-div-box-1'>
                <img src={maleAvatar} className="avatar-icon"/>
                <p>
                  Derzsi Szabolcs <br /> Email: admin3@admin.hu
                </p>
              </div>
              <div>
                <img src={maleAvatar} className="avatar-icon"/>
                <p >
                  Iglódi Gergő <br /> Email: admin2@admin.hu
                </p>
              </div>
              <div>
                <img src={maleAvatar} className="avatar-icon"/>
                <p>
                  Oláh Ádám <br /> Email: admin4@admin.hu
                </p>
              </div>
            </div>
            <div>
              <div>
                <img src={femaleAvatar} className="avatar-icon"/>
                <p>
                  Urbán Eszter <br /> Email: admin@admin.hu
                </p>
              </div>
              <div>
                <img src={maleAvatar} className="avatar-icon"/>
                <p>
                  Szőke Ákos <br /> Email: admin5@admin.hu
                </p>
              </div>
              <div>
                <img src={maleAvatar} className="avatar-icon"/>
                <p>
                  Szőnyi Ádám <br /> Email: admin6@admin.hu
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='contact-us'>
          <div className='contact-us-header'>
            <h3 className='contact-title'>Contact us!</h3>
            <img src={new_mail} alt="contact us" className='new-mail-img'/>
          </div>
          <form onSubmit={submitContactHandler} className='contact-us-form'>
            <input
              type='text'
              name='contactName'
              placeholder='Please give us a contact name'
              onChange={changeContactHandler}
              className={contactInfo.contactName ? null : required}
              value={contactInfo?.contactName}
            />
            <input
              type='email'
              name='email'
              placeholder='Your email'
              onChange={changeContactHandler}
              className={contactInfo.email ? null : required}
              value={contactInfo?.email}
            />
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Title'
              onChange={changeContactHandler}
              className={contactInfo.title ? null : required}
              value={contactInfo?.title}
            />
            <select
              onChange={changeContactHandler}
              name='theme'
              className={contactInfo.theme ? null : required}
              value={contactInfo?.theme}
            >
              <option value=''>Please choose a theme</option>
              <option value='problem'>Problem with the webpage</option>
              <option value='question'>Have a question</option>
            </select>
            <textarea
              placeholder='Please write here your message.'
              name='contactMessage'
              onChange={changeContactHandler}
              className={contactInfo.contactMessage ? null : required}
              value={contactInfo?.contactMessage}
            />
            <button>Send</button>
          </form>
        </div>
        
      </div>
    </div>
  );
};
export default ContactView;
