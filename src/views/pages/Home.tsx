import { MainLayout } from '@/views/layouts';
import { CharacterCard } from '@/components/cards';
import Grid from '@/components/grid/Grid';
import SearchInput from '@/components/search-input/SearchInput';

import { useGetAllCharactersUseCase } from '@/hooks/characters/useGetAllCharactersUseCase';
import { useGetCharacterUseCase } from '@/hooks/characters/useGetCharacterUseCase';
import { Character } from '@/modules/characters/domain/Character';
import { useSearchCharactersUseCase } from '@/src/hooks/characters/useSearchCharactersUseCase';
import { flushSync } from 'react-dom';
import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';
import { useLocation } from 'wouter';
import { useGetComicsByCharacterId } from '@/src/hooks/comics/useGetComicsByCharacterId';
import { Comic } from '@/src/modules/comics/domain/Comic';

const Home = () => {
  const [, setLocation] = useLocation();
  const { limit, retrieveAllCharacters } = useGetAllCharactersUseCase();
  const { onInputChange, submitHandler, searchTerms } =
    useSearchCharactersUseCase(retrieveAllCharacters);
  const { retrieveCharacter } = useGetCharacterUseCase();
  const { retrieveComicsByCharacterId } = useGetComicsByCharacterId();

  const {
    state: { loading, characters },
    dispatch,
  } = useCharacterContext();

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
      setLocation(`/characters/${characterInfo.id}`);
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
      if (!document?.startViewTransition && characterInfo) {
        if (characterInfo) {
          return updateState(characterInfo, characterComics);
        }
      }

      if (document?.startViewTransition && characterInfo) {
        const transition =
          document &&
          document?.startViewTransition(async () => {
            flushSync(() => {
              if (characterInfo) {
                return updateState(characterInfo, characterComics);
              }
            });
          });

        await transition.finished;
      }
    }
  };

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
            />
          ))}

        {!characters?.length &&
          loading &&
          Array.from(Array(limit).keys()).map((index) => (
            <CharacterCard key={index} loading />
          ))}
      </Grid>
    </MainLayout>
  );
};

export default Home;
