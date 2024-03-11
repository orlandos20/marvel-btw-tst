import { Link } from 'wouter';

import MarvelLogo from '../logos/marvel-logo';

import { useGetAllCharactersUseCase } from '@/src/hooks/characters/useGetAllCharactersUseCase';
import { useFavouritesUseCase } from '@/hooks/characters/useFavouritesUseCase';

import './header.css';

const Header = () => {
  const { retrieveAllCharacters } = useGetAllCharactersUseCase();
  const { favorites, showOnlyFavorites } = useFavouritesUseCase();

  const handleClick = () => {
    retrieveAllCharacters();
  };

  return (
    <header className="header">
      <div>
        <Link href="/" onClick={handleClick}>
          <MarvelLogo />
        </Link>
      </div>
      <div onClick={showOnlyFavorites}>
        ❤️ {favorites.length > 0 && favorites.length}
      </div>
    </header>
  );
};

export default Header;
