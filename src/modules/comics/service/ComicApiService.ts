import { ComicRepository } from '@/modules/comics/domain/ComicRepository';
import { Comic } from '@/modules/comics/domain/Comic';
import { Hasher } from '@/src/types';
import { MarvelResponseWrapper } from '@/src/types/marvelApiResponseTypes';
import { buildHashParams } from '@/src/utils/request-utils';

export const createComicApiRepository = ({
  requester = window.fetch,
}: {
  requester?: typeof window.fetch;
} = {}): ComicRepository => {
  const getByCharacterId = async ({
    hasher,
    characterId,
  }: {
    hasher: Hasher;
    characterId: number;
  }): Promise<MarvelResponseWrapper<Comic[]>> => {
    const hashParams = buildHashParams(hasher);

    const response = await requester(
      `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?${hashParams}`
    );

    const parsedResponse = await response.json();

    if (parsedResponse.status === 'Ok') {
      return parsedResponse;
    }

    throw parsedResponse;
  };

  return {
    getByCharacterId,
  };
};
