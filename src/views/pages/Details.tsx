import { MainLayout } from '../layouts';
import DetailsHero from '../components/details-hero-section/DetailsHero';
import Slider from '../components/slider/Slider';

interface DetailsProps {
  characterId: string;
}

const Details: React.FC<DetailsProps> = ({ characterId }) => {
  return (
    <MainLayout>
      <DetailsHero />
      <Slider />
      <div>{characterId}</div>
    </MainLayout>
  );
};

export default Details;
