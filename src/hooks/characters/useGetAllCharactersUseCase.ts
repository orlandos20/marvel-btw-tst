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

export type UseGetAllCharactersUseCase = ReturnType<
  typeof useGetAllCharactersUseCase
>;

export const useGetAllCharactersUseCase = () => {
  const {
    state: { characters, loading, attributionData },
    dispatch,
  } = useCharacterContext();

  const retrieveAllCharacters = async () => {
    dispatch({
      type: 'loading',
      payload: {
        loading: true,
      },
    });
    const results = await getAllCharacters(characterRepository)({
      hasher: md5,
      params,
    });

    if (results && results?.data?.results) {
      const { data, ...rest } = results;
      dispatch({
        type: 'setCharacters',
        payload: {
          characters: data.results,
        },
      });
      dispatch({
        type: 'loading',
        payload: {
          loading: false,
        },
      });
      if (!attributionData?.copyright) {
        dispatch({
          type: 'setAttributionData',
          payload: {
            attributionData: {
              ...rest,
            },
          },
        });
      }
    }
  };

  useEffect(() => {
    if (!characters?.length && !loading) {
      retrieveAllCharacters();
    }
  }, []);

  return {
    retrieveAllCharacters,
    ...params,
  };
};
