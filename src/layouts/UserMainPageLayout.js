import {Outlet} from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import SigninView from '../views/SignInView';

const UserMainPageLayout = ({userLog}) => {
  return (
    <>
      
        <div className='layout-container'>
          <Header />
          <div className='layout-inner-container'>
            {Object.values(userLog)?.length ? <Outlet /> : <SigninView />}
          </div>
          <Footer />
        </div>
      
    </>
  );
};

export default UserMainPageLayout;
