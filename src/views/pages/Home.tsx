import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useLocation } from 'wouter';

import { MainLayout } from '@/views/layouts';
import { CharacterCard } from '@/components/cards';
import Grid from '@/components/grid/Grid';
import SearchInput from '@/components/search-input/SearchInput';

import { Character } from '@/modules/characters/domain/Character';
import { Comic } from '@/src/modules/comics/domain/Comic';

import { useCharacterContext } from '@/contexts/characters/CharacterProvider';

import { useGetAllCharactersUseCase } from '@/hooks/characters/useGetAllCharactersUseCase';
import { useGetCharacterUseCase } from '@/hooks/characters/useGetCharacterUseCase';
import { useSearchCharactersUseCase } from '@/hooks/characters/useSearchCharactersUseCase';
import { useGetComicsByCharacterId } from '@/hooks/comics/useGetComicsByCharacterId';
import { useFavouritesUseCase } from '@/hooks/characters/useFavouritesUseCase';

import NoSearchResults from '@/src/assets/no-search-results-bg.webp';

const Home = () => {
  const {
    state: { loading, characters, searchTerms },
    dispatch,
  } = useCharacterContext();
  const { limit, retrieveAllCharacters } = useGetAllCharactersUseCase();
  const { onInputChange, submitHandler } = useSearchCharactersUseCase(
    retrieveAllCharacters
  );
  const { retrieveCharacter } = useGetCharacterUseCase();
  const { retrieveComicsByCharacterId, sortComicsByDate } =
    useGetComicsByCharacterId();
  const { handleFavorite } = useFavouritesUseCase();
  const [, setLocation] = useLocation();

  const updateState = (characterInfo: Character, characterComics: Comic[]) => {
    if (characterInfo) {
      dispatch({
        type: 'setCharacterData',
        payload: {
          characterData: {
            character: characterInfo,
            comics: characterComics,
          },
        },
      });
      setLocation(`/marvel-btw-tst/characters/${characterInfo.id}`);
      dispatch({
        type: 'loading',
        payload: {
          loading: false,
        },
      });
    }
  };

  const handleClick = async (characterId: number) => {
    if (characterId) {
      dispatch({
        type: 'loading',
        payload: {
          loading: true,
        },
      });
      const characterInfo = await retrieveCharacter(characterId);
      const characterComics = await retrieveComicsByCharacterId(characterId);
      const sortedComics = sortComicsByDate({ comics: characterComics });
      if (!document?.startViewTransition && characterInfo) {
        if (characterInfo) {
          return updateState(characterInfo, sortedComics);
        }
      }

      if (document?.startViewTransition && characterInfo) {
        const transition =
          document &&
          document?.startViewTransition(async () => {
            flushSync(() => {
              if (characterInfo) {
                return updateState(characterInfo, sortedComics);
              }
            });
          });

        await transition.finished;
      }
    }
  };

  useEffect(() => {
    if (!characters?.length && !loading) {
      retrieveAllCharacters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <form onSubmit={submitHandler}>
        <SearchInput
          name="nameStartsWith"
          value={searchTerms}
          placeholder="Search a Character..."
          searchResultsLegend={`${characters?.length} results`}
          onInput={onInputChange}
        />
      </form>

      <Grid>
        {characters?.length > 0 &&
          characters?.map((character: Character) => (
            <CharacterCard
              key={character?.id}
              character={character}
              handleClick={handleClick}
              handleFavorite={handleFavorite}
            />
          ))}

        {!characters?.length &&
          loading &&
          Array.from(Array(limit).keys()).map((index) => (
            <CharacterCard key={index} loading />
          ))}
      </Grid>

      {!loading && !characters?.length && (
        <img
          className="no-search-results"
          alt="No search results"
          src={NoSearchResults}
        />
      )}
    </MainLayout>
  );
};

export default Home;
