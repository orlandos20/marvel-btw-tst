import { MainLayout } from '../layouts';
import DetailsHero from '../components/details-hero-section/DetailsHero';
import Slider from '../components/slider/Slider';
import { flushSync } from 'react-dom';
import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface DetailsProps {
  characterId: string;
}

const Details: React.FC<DetailsProps> = ({ characterId }) => {
  const [, setLocation] = useLocation();

  const handleBackNavigation = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setLocation(window.location.pathname);
      });
    });
    await transition.finished;
  };

  useEffect(() => {
    window.addEventListener('popstate', (e) => handleBackNavigation(e));

    return () => window.removeEventListener('popstate', handleBackNavigation);
  }, []);

  return (
    <MainLayout>
      <DetailsHero />
      <Slider />
      <div>{characterId}</div>
    </MainLayout>
  );
};

export default Details;
