import {NavLink} from 'react-router-dom';

/* Style */
import './InfoBox.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const InfoBox = ({icon, nav, text}) => {
  return (
    <NavLink className='info-box-card' to={nav}>
      <img className='info-box-img' src={icon} alt='thank-you-search' />
      {/* <FontAwesomeIcon icon={icon} className='infoBox-icon' /> */}
      <button className='info-box-text'>{text}</button>
    </NavLink>
  );
};
export default InfoBox;
