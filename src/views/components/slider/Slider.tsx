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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          inifinite: true,
          centerMode: true,
          dots: true,
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
          centerPadding: '60px',
        },
      },
      {
        breakpoint: 520,
        settings: {
          inifinite: true,
          centerMode: true,
          dots: true,
          arrows: false,
          dotsClass: 'slick-dots slick-thumb',
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '60px',
        },
      },
      {
        breakpoint: 360,
        settings: {
          inifinite: true,
          centerMode: true,
          dots: true,
          arrows: false,
          dotsClass: 'slick-dots slick-thumb',
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '45px',
        },
      },
    ],
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
