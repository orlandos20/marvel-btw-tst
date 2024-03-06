import MarvelLogo from '../logos/marvel-logo';

import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div>
        <MarvelLogo />
      </div>
      <div>❤️</div>
    </header>
  );
};

export default Header;
