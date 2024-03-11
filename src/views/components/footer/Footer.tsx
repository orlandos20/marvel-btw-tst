import FooterLogo from '@/src/assets/marvelMLogo.svg?react';

import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';

import './footer.css';

const Footer = () => {
  const {
    state: { attributionData },
  } = useCharacterContext();

  const { copyright, attributionHTML } = attributionData;

  return (
    <footer className="main-footer">
      <div className="main-footer--content">
        <span className="main-footer__logo--svg">
          <FooterLogo />
        </span>
        <div className="main-footer__legal-wrapper">
          <span dangerouslySetInnerHTML={{ __html: attributionHTML }}></span>
          <span>{copyright}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
