import { PropsWithChildren } from 'react';
import './main-layout.css';

import Header from '../../components/header/Header';
import ProgressBar from '../../components/progress-bar/ProgressBar';

const Main: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="layout">
      <Header />
      <ProgressBar />
      <section id="content-section" className="layout--content">
        {children}
      </section>
    </section>
  );
};

export default Main;
