import { useCharacterContext } from '@/contexts/characters/CharacterProvider';
import { Character } from '@/modules/characters/domain/Character';
import { useFavouritesUseCase } from '@/hooks/characters/useFavouritesUseCase';

import FavSelected from '@/src/assets/favSelected.svg?react';
import FavUnselected from '@/src/assets/favUnselected.svg?react';
import './details-hero-section.css';

const DetailsHero = () => {
  const {
    state: {
      loading,
      favorites,
      characterData: { character },
    },
  } = useCharacterContext();
  const { handleFavorite } = useFavouritesUseCase();

  const {
    name,
    description,
    thumbnail = {} as Character['thumbnail'],
  } = character;
  const { path = '', extension = '' } = thumbnail;

  const isFavorite = favorites.some(
    (favorite: Character) => favorite.id === character?.id
  );

  return (
    <div className="hero-section">
      <div className="hero-section--container">
        {!loading && (
          <img
            className="hero-section--container__image"
            src={`${path}.${extension}`}
          />
        )}
        {loading && <div className="hero-section--img-loading"></div>}

        <div className="hero-section--container__description">
          {!loading && (
            <div className="hero--section--description__title">
              <h2>{name}</h2>
              <div
                onClick={(e) => handleFavorite && handleFavorite(e, character)}
              >
                {!isFavorite && <FavUnselected className="svg unfilled" />}
                {isFavorite && <FavSelected className="svg filled" />}
              </div>
            </div>
          )}

          {!loading && (
            <div className="hero--section--description__description">
              <h4>{description}</h4>
            </div>
          )}

          {loading && <h2 className="hero-section--text-loading"></h2>}
          {loading && <h4 className="hero-section--text-loading"></h4>}
        </div>
      </div>
    </div>
  );
};

export default DetailsHero;
