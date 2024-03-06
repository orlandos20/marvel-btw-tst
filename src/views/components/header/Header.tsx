import { Link } from 'wouter';

import MarvelLogo from '../logos/marvel-logo';

import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div>
        <Link href="/">
          <MarvelLogo />
        </Link>
      </div>
      <div>❤️</div>
    </header>
  );
};

export default Header;
