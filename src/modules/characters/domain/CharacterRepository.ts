import { Character } from './Character';
import { MarvelResponseWrapper } from '../../../types/marvelApiResponseTypes';

interface DefaultParams {
  limit: string | number;
  offset: string | number;
  orderBy?: 'name' | 'modified' | '-name' | '-modified';
}

export type Hasher = (toHash: string) => string;
export type GetAllParams = {
  hasher: Hasher;
  params?: DefaultParams;
};

export interface CharacterRepository {
  getAll: ({
    hasher,
    params,
  }: GetAllParams) => Promise<MarvelResponseWrapper<Character>>;
  getAllByName?: () => Promise<MarvelResponseWrapper<Character>>;
}
