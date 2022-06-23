import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation, Autoplay} from 'swiper';

/* Components */
import PictureSliderMessage from './PictureSliderMessage';

/* Style */
import '../HomePage/Styles/PictureSlider.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const PictureSlider = () => {
  return (
    <div className='image-slider-container'>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        speed={2000}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{ delay: 6000, /* pauseOnMouseEnter: true */ }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={false}
        className='swiper'
      >
        <SwiperSlide><PictureSliderMessage message='find'/></SwiperSlide>
        <SwiperSlide><PictureSliderMessage message='register'/></SwiperSlide>
        <SwiperSlide><PictureSliderMessage message='friend'/></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PictureSlider;
