import { Link } from 'wouter';

import MarvelLogo from '../logos/marvel-logo';

import { useGetAllCharactersUseCase } from '@/src/hooks/characters/useGetAllCharactersUseCase';
import { useFavouritesUseCase } from '@/hooks/characters/useFavouritesUseCase';

import FavSelected from '@/src/assets/favSelected.svg?react';
import FavUnselected from '@/src/assets/favUnselected.svg?react';

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
      <div className="icon-container" onClick={showOnlyFavorites}>
        {favorites.length > 0 ? (
          <FavSelected className="filled" />
        ) : (
          <FavUnselected fill="white" />
        )}
        <span data-testid="fav-counter">
          {favorites.length > 0 && favorites.length}
        </span>
      </div>
    </header>
  );
};

export default Header;
