import { useEffect } from 'react';
import { flushSync } from 'react-dom';

import { useLocation } from 'wouter';

import { MainLayout } from '@/views/layouts';
import DetailsHero from '@/components/details-hero-section/DetailsHero';
import Slider from '@/components/slider/Slider';
import { useGetCharacterUseCase } from '@/src/hooks/characters/useGetCharacterUseCase';
import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';

interface DetailsProps {
  characterId: string;
}

const Details: React.FC<DetailsProps> = ({ characterId }) => {
  const {
    state: { characterData, loading },
    dispatch,
  } = useCharacterContext();
  const { retrieveCharacter } = useGetCharacterUseCase();
  const [, setLocation] = useLocation();

  const handleGetCharacterData = async () => {
    const characterInfo = await retrieveCharacter(parseInt(characterId, 10));
    if (characterInfo) {
      dispatch({
        type: 'loading',
        payload: {
          loading: false,
        },
      });
      dispatch({
        type: 'setCharacterData',
        payload: {
          characterData: characterInfo,
        },
      });
    }
  };

  useEffect(() => {
    if (!characterData.name) {
      if (!loading) {
        dispatch({
          type: 'loading',
          payload: {
            loading: true,
          },
        });
      }
      handleGetCharacterData();
    }
  }, []);

  const handleBackNavigation = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setLocation(window.location.pathname);
      });
    });
    await transition.finished;
  };

  useEffect(() => {
    window.addEventListener('popstate', (e) => handleBackNavigation(e));

    return () => window.removeEventListener('popstate', handleBackNavigation);
  }, []);

  return (
    <MainLayout>
      <DetailsHero />
      <Slider />
      <div>{characterId}</div>
    </MainLayout>
  );
};

export default Details;
