import { useEffect } from 'react';
import md5 from 'md5';

import { createCharacterApiRepository } from '@/modules/characters/service/CharacterApiService';
import { getAllCharacters } from '@/modules/characters/application/getAll';
import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';

const characterRepository = createCharacterApiRepository();

const params = {
  limit: 50,
  offset: 10,
};

export const useGetAllCharactersUseCase = () => {
  const {
    state: { characters },
    dispatch,
  } = useCharacterContext();

  const retrieveAllCharacters = async () => {
    const results = await getAllCharacters(characterRepository)({
      hasher: md5,
      params,
    });

    if (results && results?.data?.results?.length > 0) {
      dispatch({
        type: 'setCharacters',
        payload: {
          characters: results.data.results,
        },
      });
    }
  };

  useEffect(() => {
    if (!characters?.length) {
      retrieveAllCharacters();
    }
  }, []);

  return {
    characters,
    ...params,
  };
};
