import {
  CharacterRepository,
  GetAllParams,
} from '@/modules/characters/domain/CharacterRepository';
import { Character } from '@/modules/characters/domain/Character';
import { MarvelResponseWrapper } from '@/types/marvelApiResponseTypes';

export const getAllCharacters = (
  characterRepository: CharacterRepository
): (({
  hasher,
  params,
}: GetAllParams) => Promise<MarvelResponseWrapper<Character[]>>) => {
  return async ({
    hasher,
    params,
  }: GetAllParams): Promise<MarvelResponseWrapper<Character[]>> => {
    return await characterRepository.getAll({ hasher, params });
  };
};
