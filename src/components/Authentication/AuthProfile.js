import {createContext, useContext, useEffect, useMemo} from 'react';
import {AuthContext} from './AuthContext';
import SignInView from '../../views/SignInView';
import UserMainPageLayout from '../../layouts/UserMainPageLayout';
import {liveValue} from '../../services/crud';

export function AuthProfile(props) {
  const authContext = useContext(AuthContext);

  useMemo(() => {
    const liveUserDetails = liveValue(
      `userDetails/${authContext.userLog.user.uid}`,
      (snapshot) => {
        authContext.setUserLog((prev) => ({...prev, userDetails: snapshot.val()}));
      }
    );
    console.log(authContext.userLog);
    return () => liveUserDetails();
  }, [authContext.userLog.user.uid]);


  if (authContext.userLog) {
    return <UserMainPageLayout />;
  }

  return null;
}
