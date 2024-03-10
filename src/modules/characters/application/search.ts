import {
  CharacterRepository,
  GetParams,
} from '@/modules/characters/domain/CharacterRepository';
import { Character } from '@/modules/characters/domain/Character';
import { MarvelResponseWrapper } from '@/types/marvelApiResponseTypes';

export const searchCharacters = (
  characterRepository: CharacterRepository
): (({
  hasher,
  params,
}: GetParams) => Promise<MarvelResponseWrapper<Character[]>>) => {
  return async ({
    hasher,
    params,
  }: GetParams): Promise<MarvelResponseWrapper<Character[]>> => {
    return await characterRepository.getAll({ hasher, params });
  };
};
