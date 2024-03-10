import { Character } from './Character';
import { MarvelResponseWrapper } from '@/types/marvelApiResponseTypes';

export interface DefaultParams {
  limit: string | number;
  offset: string | number;
  orderBy?: 'name' | 'modified' | '-name' | '-modified';
  name?: string;
  nameStartsWith?: string | undefined;
  modifiedSince?: Date | undefined;
  comics?: number | undefined;
  series?: number | undefined;
  events?: number | undefined;
  stories?: number | undefined;
}

export type Hasher = (toHash: string) => string;
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
