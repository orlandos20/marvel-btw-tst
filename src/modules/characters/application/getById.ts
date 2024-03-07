import { CharacterRepository } from '@/modules/characters/domain/CharacterRepository';
import { Character } from '@/modules/characters/domain/Character';

type CharacterByIdReturnType = (
  characterId: number
) => Promise<Character | undefined>;

export const getCharacterById = (
  characterRepository: CharacterRepository
): CharacterByIdReturnType => {
  return async (characterId) => {
    const results = await characterRepository.getById(characterId);

    if (results) {
      const [characterData] = results.data.results;

      return characterData;
    }
  };
};
