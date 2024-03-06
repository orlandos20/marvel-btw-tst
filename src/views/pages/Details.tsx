import { PropsWithChildren } from 'react';

import { MainLayout } from '../layouts';

const Details: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <MainLayout>
      Details Page
      <div>{children}</div>
    </MainLayout>
  );
};

export default Details;
