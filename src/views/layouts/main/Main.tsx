import { PropsWithChildren } from 'react';
import './main-layout.css';

import Header from '../../components/header/Header';
import ProgressBar from '../../components/progress-bar/ProgressBar';

const Main: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="layout">
      <Header />
      <ProgressBar />
      <section className="layout--content__container">{children}</section>
    </section>
  );
};

export default Main;
