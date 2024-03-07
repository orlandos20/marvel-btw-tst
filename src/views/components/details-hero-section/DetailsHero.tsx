import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';
import './details-hero-section.css';
import { Character } from '@/src/modules/characters/domain/Character';

const DetailsHero = () => {
  const {
    state: { characterData },
  } = useCharacterContext();

  const {
    name,
    description,
    thumbnail = {} as Character['thumbnail'],
  } = characterData;
  const { path = '', extension = '' } = thumbnail;

  return (
    <div className="hero-section">
      <div className="hero-section--container">
        <img
          className="hero-section--container__image"
          // src="https://s3-alpha-sig.figma.com/img/66f3/401f/6380e1c330e32763ea5a102f6b475c49?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DZ7~Tkw24yEqQP0-YrIcGi~mY~qeMg8ATJyWkQr~8tU68SOqytBXgE-50ARzQgOAfNtCO0XgX-h8Mb~Evs89fD75-izpkWZKLMNa-AC4ScQm4o6Qm-5SKhyVNVxtDxLdcM-u0RaSdRbOZI11kN1GlQC~wPNvjqso16BZ2dIKPcdalJ09szhiNDUk1eMXMi14Tg6Guat8pZ0omDRcxmc1Y11pP7qNBydiwaBWzHsu72QfM8UoE1qAOvrQzJQxM~qZGFRdlpT0Vmt3~n24HRjSkQkqpYSje0jUqTDtuKbXg8Hp2G8fEWqojvcWozlZ3RDwQSik4dkIOeOA5PIQsH-X-A__"
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
