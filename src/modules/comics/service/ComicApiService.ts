import { ComicRepository } from '@/modules/comics/domain/ComicRepository';
import { Comic } from '@/modules/comics/domain/Comic';
import { Hasher } from '@/src/types';
import { MarvelResponseWrapper } from '@/src/types/marvelApiResponseTypes';
import { buildHashParams } from '@/src/utils/request-utils';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
      `${baseUrl}/characters/${characterId}/comics?${hashParams}`
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
