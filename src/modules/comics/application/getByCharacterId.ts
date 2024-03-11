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

    if (results?.data?.results.length > 0) {
      const { results: comics } = results.data;

      return comics;
    } else {
      return [];
    }
  };
};
