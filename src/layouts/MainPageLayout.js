import {Outlet} from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainPageLayout = () => {
  return (
    <div className='layout-container'>
      <Header />
      <div className='layout-inner-container'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainPageLayout;
