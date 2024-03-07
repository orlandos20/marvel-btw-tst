import { MainLayout } from '@/views/layouts';
import { CharacterCard } from '@/components/cards';
import Grid from '@/components/grid/Grid';

import { useGetAllCharactersUseCase } from '@/hooks/characters/useGetAllCharactersUseCase';
import { useGetCharacterUseCase } from '@/hooks/characters/useGetCharacterUseCase';
import { Character } from '@/modules/characters/domain/Character';

const Home = () => {
  const { characters, limit } = useGetAllCharactersUseCase();
  const { retrieveCharacter } = useGetCharacterUseCase();

  return (
    <MainLayout>
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
