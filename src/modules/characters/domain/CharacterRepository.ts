import { DefaultParams, Hasher } from '@/src/types';
import { Character } from './Character';
import { MarvelResponseWrapper } from '@/types/marvelApiResponseTypes';

export type GetParams = {
  hasher: Hasher;
  params?: DefaultParams;
};

export interface CharacterRepository {
  getAll: ({
    hasher,
    params,
  }: GetParams) => Promise<MarvelResponseWrapper<Character[]>>;
  search?: ({
    hasher,
    params,
  }: GetParams) => Promise<MarvelResponseWrapper<Character[]>>;
  getById: (characterId: number) => Promise<MarvelResponseWrapper<Character[]>>;
}
