import notFoundImage from '../others/decoration/not-found.svg';

import {useNavigate} from 'react-router-dom';

import './NotFound.css';

const NotFound = () => {
  const navToHome = useNavigate();

  return (
    <div className='notfound-container'>
      <div className='notfound-inner-container'>
        <h1 className='notfound-message'>
          Oops! We can't find the page you're looking for.
        </h1>
        <button className='notfound-button' onClick={() => navToHome('/home')}>
          Back to Home
        </button>
      </div>
      <img className='notfound-image' src={notFoundImage} alt='not-found' />
    </div>
  );
};

export default NotFound;
