import { useEffect } from 'react';
import { flushSync } from 'react-dom';

import { useLocation } from 'wouter';

import { MainLayout } from '@/views/layouts';
import DetailsHero from '@/components/details-hero-section/DetailsHero';
import Slider from '@/components/slider/Slider';
import { useGetCharacterUseCase } from '@/src/hooks/characters/useGetCharacterUseCase';
import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';
import { useGetComicsByCharacterId } from '@/src/hooks/comics/useGetComicsByCharacterId';

import { ComicCard } from '@/components/cards';

interface DetailsProps {
  characterId: string;
}

const Details: React.FC<DetailsProps> = ({ characterId }) => {
  const {
    state: { characterData, loading },
    dispatch,
  } = useCharacterContext();
  const { retrieveCharacter } = useGetCharacterUseCase();
  const { sortComicsByDate, retrieveComicsByCharacterId } =
    useGetComicsByCharacterId();
  const [, setLocation] = useLocation();

  const handleGetCharacterData = async () => {
    const parsedId = parseInt(characterId, 10);
    const characterInfo = await retrieveCharacter(parsedId);
    const characterComics = await retrieveComicsByCharacterId(parsedId);
    const sortedComicsByDate = sortComicsByDate({ comics: characterComics });
    if (characterInfo && sortedComicsByDate) {
      dispatch({
        type: 'loading',
        payload: {
          loading: false,
        },
      });
      dispatch({
        type: 'setCharacterData',
        payload: {
          characterData: {
            character: characterInfo,
            comics: sortedComicsByDate,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (!characterData?.character?.name) {
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
      <Slider>
        {characterData?.comics?.length > 0 &&
          characterData?.comics?.map((comicData) => (
            <ComicCard
              key={comicData.id}
              comicData={comicData}
              loading={false}
            />
          ))}

        {!characterData?.comics?.length &&
          loading &&
          Array.from(Array(20).keys()).map((index) => (
            <ComicCard key={index} loading />
          ))}
      </Slider>
    </MainLayout>
  );
};

export default Details;
