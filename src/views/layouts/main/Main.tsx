import { PropsWithChildren } from 'react';

import Header from '@/components/header/Header';
import ProgressBar from '@/components/progress-bar/ProgressBar';
import Footer from '@/components/footer/Footer';

import './main-layout.css';
import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';
const Main: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    state: { loading },
  } = useCharacterContext();

  return (
    <section className="layout">
      <Header />
      <ProgressBar />
      <section
        id="content-section"
        className="layout--content"
        aria-busy={loading}
        aria-describedby="loading"
      >
        {children}
      </section>
      <Footer />
    </section>
  );
};

export default Main;
