import { MainLayout } from '@/views/layouts';
import { CharacterCard } from '@/components/cards';
import Grid from '@/components/grid/Grid';
import SearchInput from '@/components/search-input/SearchInput';

import { useGetAllCharactersUseCase } from '@/hooks/characters/useGetAllCharactersUseCase';
import { useGetCharacterUseCase } from '@/hooks/characters/useGetCharacterUseCase';
import { Character } from '@/modules/characters/domain/Character';
import { FormEvent } from 'react';

const Home = () => {
  const { characters, limit } = useGetAllCharactersUseCase();
  const { retrieveCharacter } = useGetCharacterUseCase();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);
    const formValuesAsParams = new URLSearchParams(
      formValues as unknown as Record<string, string>
    ).toString();
    console.log('formValues --> ', formValuesAsParams);
  };

  return (
    <MainLayout>
      <form onSubmit={submitHandler}>
        <SearchInput
          name="nameStartsWith"
          placeholder="Search a Character..."
          searchResultsLegend={`${characters?.length} results`}
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
          Array.from(Array(limit).keys()).map((index) => (
            <CharacterCard key={index} loading />
          ))}
      </Grid>
    </MainLayout>
  );
};

export default Home;
