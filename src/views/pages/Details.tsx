import { PropsWithChildren } from 'react';

import { MainLayout } from '../layouts';
import DetailsHero from '../components/details-hero-section/DetailsHero';

const Details: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <MainLayout>
      <DetailsHero />
      <div>{children}</div>
    </MainLayout>
  );
};

export default Details;
