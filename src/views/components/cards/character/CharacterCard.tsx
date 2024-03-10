import { useLocation } from 'wouter';
import { flushSync } from 'react-dom';

import { Character } from '@/modules/characters/domain/Character';
import './character-card.css';
import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';

interface CharacterCardProps {
  loading?: boolean;
  character?: Character;
  loadCharacterInfo?: (characterId: number) => Promise<Character | undefined>;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  loading,
  loadCharacterInfo,
}) => {
  const { dispatch } = useCharacterContext();

  const [, setLocation] = useLocation();

  const handleClick = async () => {
    if (character?.id) {
      let characterData: undefined | Character;
      if (loadCharacterInfo && typeof loadCharacterInfo === 'function') {
        dispatch({
          type: 'loading',
          payload: {
            loading: true,
          },
        });
        characterData = await loadCharacterInfo(character?.id);
      }
      if (!document.startViewTransition && characterData) {
        dispatch({
          type: 'loading',
          payload: {
            loading: false,
          },
        });
        setLocation(`/characters/${character?.id}`);
      }
      const transition = document.startViewTransition(async () => {
        flushSync(() => {
          if (characterData) {
            dispatch({
              type: 'setCharacterData',
              payload: {
                characterData,
              },
            });
            setLocation(`/characters/${character?.id}`);
            dispatch({
              type: 'loading',
              payload: {
                loading: false,
              },
            });
          }
        });
      });

      await transition.finished;
    }
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
