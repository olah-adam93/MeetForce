/* Components */
import PictureSlider from '../components/HomePage/PictureSlider';
import EventSlider from '../components/HomePage/EventSlider';

/* Style */
import './Style/HomePageView.css';
import PicturesDetails from '../components/HomePage/PicturesDetails';

const HomePageView = () => {
  return (
    <div>
      <PictureSlider />
      <PicturesDetails />
      {/* <div className='separator'></div> */}
      <EventSlider
        containerName={'Newest events'}
        /* searchKey={'paymentType'}
        searchValue={'free'} */
      />
      {/* <div className='separator'></div> */}
      <div className='separator'></div>
      <EventSlider
        containerName={'Free events'}
        searchKey={'paymentType'}
        searchValue={'free'}
      />
      <div className='separator'></div>
      <EventSlider
        containerName={'Paid events'}
        searchKey={'paymentType'}
        searchValue={'ticket'}
      />
      <div className='separator'></div>
      <div className='separator'></div>
      <div className='separator'></div>
    </div>
  );
};

export default HomePageView;
