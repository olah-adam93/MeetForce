import React from 'react';

/* Components */
import InfoBox from '../others/InfoBox';

/* Style */
import '../others/InfoBox.css';
import './Style/ThankYouView.css';

/* Fontawesome */
import {
  faMagnifyingGlass,
  faCirclePlus,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';

/* Decoration */
import thankyouSearch from '../others/decoration/thankyou-search.svg';
import thankyouAdd from '../others/decoration/thankyou-add.svg';
import thankyouProfile from '../others/decoration/thankyou-profile.svg';

export default function ThankYouView() {
  return (
    <div className='thank-you-container'>
      <h1 className='thank-you-title'>Thank you for signing up! You may want to check out...</h1>
      <div className='info-box-container'>
        <InfoBox icon={thankyouSearch} nav={'/profile/searchevent'} text='Search Event' />
        <InfoBox icon={thankyouAdd} nav={'/profile/addevent'} text='Create Event' />
        <InfoBox icon={thankyouProfile} nav={'/profile'} text='View Profile' />
      </div>
    </div>
  );
}
