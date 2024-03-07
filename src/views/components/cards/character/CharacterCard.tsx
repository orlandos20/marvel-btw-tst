import { useLocation } from 'wouter';
import { flushSync } from 'react-dom';

import { Character } from '@/modules/characters/domain/Character';
import './character-card.css';

interface CharacterCardProps {
  loading?: boolean;
  character?: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  loading,
}) => {
  const [, setLocation] = useLocation();

  const handleClick = async () => {
    if (!document.startViewTransition) {
      setLocation(`/characters/${character?.id}`);
    }
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setLocation(`/characters/${character?.id}`);
      });
    });
    await transition.finished;
  };

  return (
    <div className="card" onClick={handleClick}>
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
