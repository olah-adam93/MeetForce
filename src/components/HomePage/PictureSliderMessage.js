import {NavLink} from 'react-router-dom';
import { useContext } from 'react';

/* Style */
import './Styles/PictureSliderMessage.css';

/* Images */
import dinner from '../../others/images/dinner-unsplash.jpg';
import meeting from '../../others/images/meeting-unsplash.jpg';
import festival from '../../others/images/festival-unsplash.jpg';
import game from '../../others/images/game-unsplash.jpg';
import hiking from '../../others/images/hiking-unsplash.jpg';
import team from '../../others/images/team-unsplash.jpg';

/* Authentication Context */
import {AuthContext} from '../Authentication/AuthContext';

const PictureSliderMessage = ({message}) => {
  const authContext = useContext(AuthContext);

  return (
    <>
      {message === 'find' && (
        <div className='slider-message-container'>
          <img src={hiking} alt='Logo' />
          <div className='slider-message'>
            <div className='slider-message-text'>
              Thousands of events are happening every day
            </div>
            <NavLink to='/events'>Find your next event</NavLink>
          </div>
        </div>
      )}
      {message === 'register' && (
        <div className='slider-message-container'>
          <img src={festival} alt="Logo" />
          <div className='slider-message'>
            <div className='slider-message-text'>
              Launch your dream event with our help
            </div>
            {Object.values(authContext.userLog)?.length ? <NavLink to='/profile/addevent'>Create your event</NavLink> : <NavLink to='/signin'>Create your event</NavLink>}
          </div>
        </div>
      )}
      {message === 'friend' && (
        <div className='slider-message-container'>
          <img src={game} alt="Logo" />
          <div className='slider-message'>
            <div className='slider-message-text'>
              Meet new people who share your interests
            </div>
            <NavLink to='/events'>Explore</NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default PictureSliderMessage;
