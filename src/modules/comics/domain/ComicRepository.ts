import { Hasher } from '@/src/types';
import { MarvelResponseWrapper } from '@/src/types/marvelApiResponseTypes';
import { Comic } from './Comic';

export interface ComicRepository {
  getByCharacterId: ({
    hasher,
    characterId,
  }: {
    hasher: Hasher;
    characterId: number;
  }) => Promise<MarvelResponseWrapper<Comic[]>>;
}
