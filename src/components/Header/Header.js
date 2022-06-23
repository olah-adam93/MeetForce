import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

/* Components */
import NavBarMain from './NavBarMain';

/* Style */
import './Header.css';

const Header = () => {
  const [small, setSmall] = useState(false);
  

  useEffect(() => {
    const scrollCallback = () =>
      window.pageYOffset > 80 ? setSmall(true) : setSmall(false);
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', scrollCallback);
    }
    return () => window.removeEventListener('scroll', scrollCallback);
  }, []);

  return (
    <div className={`header-container ${small ? 'header-small' : ''}`}>
      <div className='header-inner-container'>
        <div className='header-logo'>
          <NavLink className={`header-logo-navlink ${small ? 'header-logo-navlink-small' : ''}`} to='/'>
            <p>MeetAtSix</p>
            {/* <img
              className={`header-logo-img ${small ? 'img-small' : ''}`}
              src={require('../../others/logo/meetatsix100.406.szines2.png')}
              alt='logo'
            /> */}
          </NavLink>
        </div>

        <div className='header-navbar'>
          <NavBarMain />
        </div>
      </div>
    </div>
  );
};
export default Header;
