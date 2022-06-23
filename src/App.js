import './App.css';
import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';

/* Components */
import ScrollToTop from './others/ScrollToTop';

import Settings from './components/Profile/Settings';
import LogOut from './components/Profile/LogOut';
import NotFound from './others/NotFound';

/* Views */
import ChosenEventsView from './views/ChosenEventsView';
import AboutView from './views/AboutView';
import ProfileView from './views/ProfileView';
import HomePageView from './views/HomePageView';
import SignInView from './views/SignInView';
import SignUpView from './views/SignUpView';
import PrivacyView from './views/PrivacyView';
import FAQView from './views/FAQView';
import ContactView from './views/ContactView';
import CreateEventView from './views/CreateEventView';
import MyEventsView from './views/MyEventsView';
import SearchEventView from './views/SearchEventView';
import EventPageView from './views/EventPageView';
import ThankYouView from './views/ThankYouView';
import JoinSuccess from './components/HomePage/JoinSuccess';
import CreateSuccess from './components/CreateNewEvent/CreateSuccess';
import PaySuccess from './components/HomePage/PaySuccess';

/* Layouts */
import MainPageLayout from './layouts/MainPageLayout';
import UserMainPageLayout from './layouts/UserMainPageLayout';

/* Database Context */
import {EventDbContext} from './components/EventDbContext/EventDbContext';

/* Authentication Context */
import {AuthContext} from './components/Authentication/AuthContext';
import {auth} from './config/firebase';
import {onAuthStateChanged} from 'firebase/auth';

/* CRUD */
import {liveValue} from './services/crud';

function App() {
  const [db, setDb] = useState([]);
  const [userLog, setUserLog] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user belépve', user);
      if (user) {
        liveValue(`userDetails/${user.uid}`, (snapshot) => {
          setUserLog((prev) => ({...prev, userDetails: snapshot.val(), user: user}));
        });
      } else {
        setUserLog({});
      }
    });
  }, []);

  useEffect(() => {
    const liveChange = liveValue('events', (snapshot) => {
      setDb(Object.entries(snapshot.val()) || []);
    });
    return () => liveChange();
  }, [setDb]);

  return (
    <>
      {userLog &&
        <div className='App'>
          <ScrollToTop />
          <AuthContext.Provider value={{userLog, setUserLog}}>
            <EventDbContext.Provider value={{db, setDb}}>
              <Routes>
                <Route element={<MainPageLayout />}>
                  <Route path='*' element={<NotFound />} />
                  <Route path='/' element={<HomePageView />} />
                  <Route path='/home' element={<HomePageView />} />
                  <Route path='/about' element={<AboutView />} />
                  <Route path='/privacy' element={<PrivacyView />} />
                  <Route path='/events' element={<SearchEventView />} />
                  <Route path='/signin' element={<SignInView />} />
                  <Route path='/signup' element={<SignUpView />} />
                  <Route path='/contact' element={<ContactView />} />
                  <Route path='/FAQ' element={<FAQView />} />
                  <Route path='/eventpage/:eventId' element={<EventPageView />} />
                </Route>

                <Route element={<UserMainPageLayout userLog={userLog} />}>
                  <Route path='/profile' element={<ProfileView />} />
                  <Route path='/profile/chosenevents' element={<ChosenEventsView />} />
                  <Route path='/profile/addevent' element={<CreateEventView />} />
                  <Route path='/profile/myevents' element={<MyEventsView />} />
                  <Route path='/profile/searchevent' element={<SearchEventView />} />
                  <Route path='/profile/settings' element={<Settings />} />
                  <Route path='/thankyou' element={<ThankYouView />} />
                  <Route path='/signout' element={<LogOut />} />
                  <Route path='/join-success' element={<JoinSuccess />} />
                  <Route path='/create-success' element={<CreateSuccess />} />
                  <Route path='/paid-success' element={<PaySuccess />} />
                </Route>
              </Routes>
            </EventDbContext.Provider>
          </AuthContext.Provider>
        </div>
      }
    </>
  );
}

export default App;
