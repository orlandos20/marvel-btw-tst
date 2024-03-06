import { PropsWithChildren } from 'react';
import './main-layout.css';

import Header from '../../components/header/Header';

const Main: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="layout">
      <Header />
      {children}
    </section>
  );
};

export default Main;
