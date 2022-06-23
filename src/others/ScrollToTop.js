import { useLocation  } from 'react-router-dom';
import { useLayoutEffect } from 'react';

function ScrollToTop() {
  const pathname = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', 
    });
  }, [pathname])

  return null;
}

export default ScrollToTop;