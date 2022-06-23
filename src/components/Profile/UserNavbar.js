import { getAuth, signOut } from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthContext';
import './Style/UserNavbar.css';

const UserNavbar = () => {
  const authContext = useContext(AuthContext);
  const auth = getAuth();
  const navigateTo = useNavigate();
  return (
    <div className='user-navbar'>
      <ul>
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
      </ul>
    </div>
  );
};
export default UserNavbar;
