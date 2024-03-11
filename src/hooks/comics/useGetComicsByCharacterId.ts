import md5 from 'md5';

import { getComicByCharacterId } from '@/src/modules/comics/application/getByCharacterId';
import { sortComicsByDate } from '@/src/modules/comics/application/sortByDate';
import { createComicApiRepository } from '@/src/modules/comics/service/ComicApiService';
import { Comic } from '@/src/modules/comics/domain/Comic';

const comicsRepository = createComicApiRepository();

export const useGetComicsByCharacterId = () => {
  const retrieveComicsByCharacterId = async (
    characterId: number
  ): Promise<Comic[]> => {
    return await getComicByCharacterId(comicsRepository)({
      hasher: md5,
      characterId,
    });
  };

  return {
    retrieveComicsByCharacterId,
    sortComicsByDate,
  };
};
