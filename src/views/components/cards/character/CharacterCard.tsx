import { Character } from '@/modules/characters/domain/Character';
import './character-card.css';

interface CharacterCardProps {
  loading?: boolean;
  character?: Character;
  handleClick?: (characterId: number) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  loading,
  handleClick,
}) => {
  return (
    <div
      className="card"
      onClick={() => character && handleClick && handleClick(character?.id)}
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
          <div>❤️</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
