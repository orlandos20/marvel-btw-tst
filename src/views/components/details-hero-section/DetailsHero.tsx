import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';
import { Character } from '@/src/modules/characters/domain/Character';
import './details-hero-section.css';

const DetailsHero = () => {
  const {
    state: {
      loading,
      characterData: { character },
    },
  } = useCharacterContext();

  const {
    name,
    description,
    thumbnail = {} as Character['thumbnail'],
  } = character;
  const { path = '', extension = '' } = thumbnail;

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
          {!loading && <h2>{name}</h2>}
          {loading && <h2 className="hero-section--text-loading"></h2>}

          {!loading && <h4>{description}</h4>}
          {loading && <h4 className="hero-section--text-loading"></h4>}
        </div>
      </div>
    </div>
  );
};

export default DetailsHero;
