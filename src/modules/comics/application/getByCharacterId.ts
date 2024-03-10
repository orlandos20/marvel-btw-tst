import { Comic } from '../domain/Comic';
import { ComicRepository } from '../domain/ComicRepository';
import { Hasher } from '@/src/types';

type ComicsByCharacterIdReturnType = ({
  hasher,
  characterId,
}: {
  hasher: Hasher;
  characterId: number;
}) => Promise<Comic[]>;

export const getComicByCharacterId = (
  comicRepository: ComicRepository
): ComicsByCharacterIdReturnType => {
  return async ({ hasher, characterId }) => {
    const results = await comicRepository.getByCharacterId({
      hasher,
      characterId,
    });

    if (results) {
      const comics = results.data.results;

      return comics;
    } else {
      return [];
    }
  };
};
