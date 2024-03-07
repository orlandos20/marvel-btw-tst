import { useLocation } from 'wouter';

import { flushSync } from 'react-dom';
import './character-card.css';

const CharacterCard = () => {
  const [, setLocation] = useLocation();

  const handleClick = async () => {
    if (!document.startViewTransition) {
      setLocation('/character/orlando');
    }
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setLocation('/character/orlando');
      });
    });
    await transition.finished;
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card--image">
        <img
          className="card--image__content"
          src="https://s3-alpha-sig.figma.com/img/66f3/401f/6380e1c330e32763ea5a102f6b475c49?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DZ7~Tkw24yEqQP0-YrIcGi~mY~qeMg8ATJyWkQr~8tU68SOqytBXgE-50ARzQgOAfNtCO0XgX-h8Mb~Evs89fD75-izpkWZKLMNa-AC4ScQm4o6Qm-5SKhyVNVxtDxLdcM-u0RaSdRbOZI11kN1GlQC~wPNvjqso16BZ2dIKPcdalJ09szhiNDUk1eMXMi14Tg6Guat8pZ0omDRcxmc1Y11pP7qNBydiwaBWzHsu72QfM8UoE1qAOvrQzJQxM~qZGFRdlpT0Vmt3~n24HRjSkQkqpYSje0jUqTDtuKbXg8Hp2G8fEWqojvcWozlZ3RDwQSik4dkIOeOA5PIQsH-X-A__"
        />
      </div>
      <div className="card--footer">
        <div className="card--footer__divider"></div>
        <div className="card--footer__description">
          <div>Name</div>
          <div>❤️</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
