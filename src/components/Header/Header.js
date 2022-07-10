import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

/* Components */
import NavBarMain from './NavBarMain';

/* Style */
import './Header.css';

/* Fontawesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';

const Header = () => {
  const [small, setSmall] = useState(false);
  const [navDrop, setNavDrop] = useState(false);
  const [navDropOff, setNavDropOff] = useState(true);

  useEffect(() => {
    const scrollCallback = () =>
      window.pageYOffset > 80 ? setSmall(true) : setSmall(false);
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', scrollCallback);
    }
    return () => window.removeEventListener('scroll', scrollCallback);
  }, []);

  const clickOpenHandler = () => {
    setNavDrop(true);
    setNavDropOff(false);
  };
  const clickCloseHandler = () => {
    setNavDrop(false);
    setNavDropOff(true);
  };

  return (
    <div className={`header-container ${small ? 'header-small' : ''}`}>
      <div className='header-inner-container'>
        <div className='header-logo'>
          <NavLink
            className={`header-logo-navlink ${small ? 'header-logo-navlink-small' : ''}`}
            to='/'
          >
            <p>Meetforce</p>
          </NavLink>
        </div>
        <div className='header-navbar'>
          {navDropOff && (
            <FontAwesomeIcon
              className={`navbar-icon-bars ${small ? 'navbar-icon-small' : ''}`}
              icon={faBars}
              onClick={clickOpenHandler}
            />
          )}
          {navDrop && (
            <FontAwesomeIcon
              className={`navbar-icon-xmark ${small ? 'navbar-icon-small' : ''}`}
              icon={faXmarkCircle}
              onClick={clickCloseHandler}
            />
          )}
          <NavBarMain
            className='header-navbar-main'
            navDrop={navDrop}
            navDropOff={navDropOff}
            small={small}
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
