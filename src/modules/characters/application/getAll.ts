import {
  CharacterRepository,
  GetAllParams,
} from '../domain/CharacterRepository';
import { Character } from '../domain/Character';
import { MarvelResponseWrapper } from '../../../types/marvelApiResponseTypes';

export const getAllCharacters = (
  characterRepository: CharacterRepository
): (({
  hasher,
  params,
}: GetAllParams) => Promise<MarvelResponseWrapper<Character>>) => {
  return async ({
    hasher,
    params,
  }: GetAllParams): Promise<MarvelResponseWrapper<Character>> => {
    return await characterRepository.getAll({ hasher, params });
  };
};
