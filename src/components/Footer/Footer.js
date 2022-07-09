import { NavLink } from 'react-router-dom';

/* Style */
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer-nav'>
      <div className='footer-links'>
        <ul>
          <li>
            <NavLink to='/contact'>Contact</NavLink>
          </li>
          <li>
            <NavLink to='/FAQ'>FAQ</NavLink>
          </li>
          <li>
            <NavLink to='/privacy'>Privacy</NavLink>
          </li>
        </ul>
      </div>

      <div className='footer-logo'>
        <p>© 2022 Adam Olah</p>
      </div>
    </div>
  );
};
export default Footer;
