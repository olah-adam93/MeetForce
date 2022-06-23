/* Style */
import './Style/ProfileView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import statistic_data from '../others/decoration/statistic_data.svg'
/* Components */
import {useContext, useEffect, useState} from 'react';
import UserNavbar from '../components/Profile/UserNavbar';
import EventContainer from '../components/HomePage/EventContainer';
import GaleryContainer from '../components/Profile/GaleryContainer';
import EventSlider from '../components/HomePage/EventSlider';

/* Firebase */
import {getAuth} from '@firebase/auth';

/* CRUD */
import {readData} from '../services/crud';
import { liveValue } from '../services/crud';

/* Auth Context */
import {AuthContext} from '../components/Authentication/AuthContext';
import { EventDbContext } from '../components/EventDbContext/EventDbContext';

const ProfileView = () => {
  const userData = useContext(AuthContext);
  const events = useContext(EventDbContext)
  const [userDetails, setUserDetails] = useState({});
  const [filtered, setFiltered] = useState({})
  const [eventJoined, setEventJoined] = useState([]);
  const [eventsCard, setEventsCard] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  /* useEffect(()=>{
    readData('userDetails', user.uid)
    .then(snapshot => setUserDetails(snapshot.val()))
    console.log(userData.userLog.user.uid)
  }, [user.uid userData.userLog.user]) */
  const eventsLength = events.db.length;
  useEffect(() => {
    const eventsUser = events.db.filter((item) => {
      const key= item[0]
      const value = item[1]
      return value?.uid === user?.uid
    })
    setFiltered(eventsUser)
  }, [user, events]);
  useEffect(() => {
    const liveChange = liveValue('eventAttendees', (snapshot) => {
      setEventJoined(
        Object.entries(snapshot.val())
          .filter((eventArray, index) => {
            return Object.keys(eventArray[1]).includes(user.uid);
          })
          .map((eventKey, index) => {
            return eventKey[0];
          })
      );
    });
    return () => liveChange();
  }, [user]);

  useEffect(() => {
    const filteredArray = events.db.filter((event) => {
      const key = event[0];
      const filteredEventJoined = eventJoined.filter((eventKey) => {
        return key === eventKey;
      });
      return filteredEventJoined.includes(key);
    });
    setEventsCard(filteredArray);
    console.log('filtered arr: ', filteredArray);
  }, [events, user, eventJoined]);
  return (
    <div className='profile'>
      <div className='profile-head'>
        {/* <div>
          <UserNavbar />
        </div> */}
        <div>
          {/* <h1>Hi {userData.userLog.user.displayName}!</h1> */}
          <img
            className='avatar'
            src={
              userData.userLog?.user.photoURL ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            alt={userData.userLog.user.displayName}
          />
        </div>
        <div className='profile-head-information'>
          <div className='user-head-data'>
            <section>
              <p><FontAwesomeIcon icon={faPaperPlane} className="plane-icon"/>{userData.userLog.user.email}</p>
              {/* <p>{userData.userLog.userDetails?.birthday}</p> */}
              <p><FontAwesomeIcon icon={faLocationDot} className="plane-icon"/>{userData.userLog.userDetails?.location}</p>
            </section>
            <section>
              <p>{userData.userLog.userDetails?.userIntroduction}</p>
            </section>
          </div>
        </div>
      </div>
      <div className='profile-main'>
        <div className='user-head'>
          <div className='profile-statistics'>
            <div>
              <h2>Statistics</h2>
              <h3>Events number totally:  <span>{eventsLength}</span></h3>
              
              <h3>Events number you created:  <span>{filtered.length}</span></h3>
              
              <h3>Events number you joined:  <span>{eventsCard.length}</span></h3>
            </div>
          
            <img src={statistic_data} alt='statics'/>
          </div>
          <div className='events'>
            <div className='events-box'>
              <EventSlider
                containerName={'Free Events'}
                searchKey={'paymentType'}
                searchValue={'free'}
              />
            </div>
            <div className='divide'></div>
            <div className='events-box'>
              <EventSlider
                containerName={'Online Events'}
                searchKey={`locationType`}
                searchValue={`online`}
              />
            </div>
          </div>
          {/* <div className='user-galery'>
            <GaleryContainer />
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default ProfileView;
