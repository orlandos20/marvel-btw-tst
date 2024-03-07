import { Character } from '@/modules/characters/domain/Character';
import { createCharacterApiRepository } from '@/modules/characters/service/CharacterApiService';
import { getCharacterById } from '@/modules/characters/application/getById';

const characterRepository = createCharacterApiRepository();

const useGetCharacterUseCase = () => {
  const retrieveCharacter = async (
    characterId: number
  ): Promise<Character | undefined> => {
    return await getCharacterById(characterRepository)(characterId);
  };

  return {
    retrieveCharacter,
  };
};

export { useGetCharacterUseCase };
