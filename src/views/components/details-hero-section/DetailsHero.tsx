import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';
import { Character } from '@/src/modules/characters/domain/Character';
import './details-hero-section.css';

const DetailsHero = () => {
  const {
    state: {
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
        <img
          className="hero-section--container__image"
          src={`${path}.${extension}`}
        />
        <div className="hero-section--container__description">
          <h2>{name}</h2>
          <h4>{description}</h4>
        </div>
      </div>
    </div>
  );
};

export default DetailsHero;
