import { useCharacterContext } from '@/contexts/characters/CharacterProvider';
import { Character } from '@/modules/characters/domain/Character';

import FavSelected from '@/src/assets/favSelected.svg?react';
import FavUnselected from '@/src/assets/favUnselected.svg?react';

import './character-card.css';
interface CharacterCardProps {
  loading?: boolean;
  character?: Character;
  handleClick?: (characterId: number) => void;
  handleFavorite?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    character?: Character
  ) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  loading,
  handleClick,
  handleFavorite,
}) => {
  const {
    state: { favorites },
  } = useCharacterContext();

  const isFavorite = favorites.some(
    (favorite: Character) => favorite.id === character?.id
  );

  return (
    <div
      className="card"
      onClick={() => character && handleClick && handleClick(character?.id)}
      data-testid="character-card"
    >
      <div className="card--image">
        {!loading && (
          <img
            className="card--image__content"
            src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
          />
        )}

        {loading && <div className="img-loading"></div>}
      </div>
      <div className="card--footer">
        <div className="card--footer__divider"></div>
        <div className="card--footer__description">
          <div className="card--footer__description--name">
            {!loading && <span>{character?.name}</span>}
            {loading && <span className="text-loading"></span>}
          </div>
          <div
            className="fav-btn"
            onClick={(e) => handleFavorite && handleFavorite(e, character)}
          >
            {!isFavorite && <FavUnselected className="svg unfilled" />}
            {isFavorite && <FavSelected className="svg filled" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
