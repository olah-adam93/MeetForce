import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

/* Authentication Context */
import { AuthContext } from '../Authentication/AuthContext';

/* Firebase */
import { auth } from '../../config/firebase';
import { getAuth, signOut } from 'firebase/auth';

/* Fontawesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const NavBarMain = ({ navDrop, navDropOff, small }) => {
  const authContext = useContext(AuthContext);
  const auth = getAuth();
  const pathname = useLocation();
  const [closeDrop, setCloseDrop] = useState(true);

  useEffect(() => {
    setCloseDrop(false);
  }, [pathname]);

  return (
    <>
      <div className={`main-navbar ${navDrop ? ' display-navbar-modal-container' : ''}`}>
        <ul className='display-navbar-modal-content'>
          <li>
            <NavLink to='/home'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/about'>About me</NavLink>
          </li>
          <li>
            <NavLink to='/events'>Events</NavLink>
          </li>
          {!Object.values(authContext.userLog)?.length && (
            <>
              <li>
                <NavLink to='/signin'>Log In</NavLink>
              </li>
              <li>
                <NavLink to='/signup'>Sign Up</NavLink>
              </li>
            </>
          )}
          {/*----------------------*/}
          {Object.values(authContext.userLog)?.length && navDrop && (
            <>
              <li>
                <NavLink to='/profile/chosenevents'>Events joined by Me</NavLink>
              </li>
              <li>
                <NavLink to='/profile/addevent'>Create New Event</NavLink>
              </li>
              <li>
                <NavLink to='/profile/myevents'>My Events</NavLink>
              </li>
              <li>
                <NavLink to='/profile/searchevent'>Search Event</NavLink>
              </li>
              <li>
                <NavLink to='/profile/settings'>Settings</NavLink>
              </li>
              <li>
                <NavLink
                  to='/'
                  onClick={() => {
                    signOut(auth).then(() => {
                      authContext.setUserLog({});
                    });
                  }}
                >
                  Sign out
                </NavLink>
              </li>
            </>
          )}
          {/*--------------------- */}
          {!navDrop &&
            (Object.values(authContext.userLog)?.length ? (
              <div
                className='main-navbar-dropdown'
                onMouseEnter={() => {
                  setCloseDrop(true);
                }}
              >
                <li>
                  <NavLink id='main-navbar-dropdown-link' to='/profile'>
                    <FontAwesomeIcon icon={faUser} />
                    &nbsp;&nbsp;{authContext.userLog.user.email}
                  </NavLink>
                </li>
                {closeDrop && (
                  <div className='main-navbar-dropdown-content'>
                    <div className='main-navbar-inner-dropdown-content'>
                      <ul className='display-navbar-modal-content'>
                        <li>
                          <NavLink to='/profile/chosenevents'>
                            Events joined by Me
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to='/profile/addevent'>Create New Event</NavLink>
                        </li>
                        <li>
                          <NavLink to='/profile/myevents'>My Events</NavLink>
                        </li>
                        <li>
                          <NavLink to='/profile/searchevent'>Search Event</NavLink>
                        </li>
                        <li>
                          <NavLink to='/profile/settings'>Settings</NavLink>
                        </li>
                        <li>
                          <NavLink
                            to='/'
                            onClick={() => {
                              signOut(auth).then(() => {
                                authContext.setUserLog({});
                              });
                            }}
                          >
                            Sign out
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              !navDropOff && (
                <>
                  <li>
                    <NavLink to='/signin'>Log In</NavLink>
                  </li>
                  <li>
                    <NavLink to='/signup'>Sign Up</NavLink>
                  </li>
                </>
              )
            ))}
        </ul>
      </div>
    </>
  );
};
export default NavBarMain;
