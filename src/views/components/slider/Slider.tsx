import { useEffect, useRef } from 'react';

import CharacterCard from '@/components/cards/character/CharacterCard';

import './slider.css';

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderHovered = (e: WheelEvent) => {
    if (Math.sign(e.deltaY) && sliderRef?.current) {
      sliderRef?.current?.scroll({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore-next-line
        left: sliderRef?.current.firstChild?.clientWidth * 2,
        behavior: 'smooth',
      });
    }

    if (Math.sign(e.deltaY) === -1) {
      sliderRef?.current?.scroll({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore-next-line
        left: -sliderRef?.current?.firstChild?.clientWidth * 2,
        behavior: 'smooth',
      });
    }

    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    if (sliderRef?.current) {
      sliderRef?.current?.addEventListener('wheel', handleSliderHovered);
    }

    return () =>
      sliderRef?.current?.removeEventListener('wheel', handleSliderHovered);
  }, []);

  return (
    <div className="slider">
      <section className="slider--container" aria-labelledby="sliderTitle">
        <div className="slider--title">
          <h3 id="sliderTitle">COMICS</h3>
        </div>
        <div
          className="slider--container__slides"
          role="slider"
          ref={sliderRef}
        >
          <ul>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
            <li>
              <CharacterCard />
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Slider;
