import { MainLayout } from '@/views/layouts';
import { CharacterCard } from '@/components/cards';
import Grid from '@/components/grid/Grid';
import SearchInput from '@/components/search-input/SearchInput';

import { useGetAllCharactersUseCase } from '@/hooks/characters/useGetAllCharactersUseCase';
import { useGetCharacterUseCase } from '@/hooks/characters/useGetCharacterUseCase';
import { Character } from '@/modules/characters/domain/Character';
import { useSearchCharactersUseCase } from '@/src/hooks/characters/useSearchCharactersUseCase';

const Home = () => {
  const { limit, loading, characters, retrieveAllCharacters } =
    useGetAllCharactersUseCase();
  const { onInputChange, submitHandler, searchTerms } =
    useSearchCharactersUseCase(retrieveAllCharacters);
  const { retrieveCharacter } = useGetCharacterUseCase();

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
              loadCharacterInfo={retrieveCharacter}
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
