import { ComicRepository } from '@/modules/comics/domain/ComicRepository';
import { Hasher } from '@/src/types';
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
  }) => {
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
