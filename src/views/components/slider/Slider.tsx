import { PropsWithChildren } from 'react';
import SlickSlider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css';

const Slider: React.FC<PropsWithChildren> = ({ children }) => {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <div className="slider">
      <section className="slider--container" aria-labelledby="sliderTitle">
        <div className="slider--title">
          <h3 id="sliderTitle">COMICS</h3>
        </div>
        <SlickSlider {...settings}>{children}</SlickSlider>
      </section>
    </div>
  );
};

export default Slider;
