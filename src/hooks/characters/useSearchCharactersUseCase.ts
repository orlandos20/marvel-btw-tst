import { ChangeEvent, FormEvent, useCallback } from 'react';
import md5 from 'md5';

import { createCharacterApiRepository } from '@/modules/characters/service/CharacterApiService';
import { searchCharacters } from '@/modules/characters/application/search';
import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';
import { UseGetAllCharactersUseCase } from '@/hooks/characters/useGetAllCharactersUseCase';

const characterRepository = createCharacterApiRepository();

const defaultParams = {
  limit: 50,
  offset: 10,
};

const searchInputName = 'nameStartsWith';

export const useSearchCharactersUseCase = (
  getAllCharacters: UseGetAllCharactersUseCase['retrieveAllCharacters']
) => {
  const {
    state: { searchTerms },
    dispatch,
  } = useCharacterContext();

  const handleSearchCharacters = async ({
    formValues,
    searchTerms,
  }: {
    formValues: FormData;
    searchTerms: string;
  }) => {
    const params = Object.fromEntries(formValues.entries());
    dispatch({
      type: 'loading',
      payload: {
        loading: true,
      },
    });

    const results = await searchCharacters(characterRepository)({
      hasher: md5,
      params: {
        ...defaultParams,
        ...params,
      },
    });

    if (results && results?.data?.results) {
      dispatch({
        type: 'searchCharacters',
        payload: {
          characters: results.data.results,
          searchTerms,
        },
      });
      dispatch({
        type: 'loading',
        payload: {
          loading: false,
        },
      });
    }
  };

  const submitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);
    if ((formValues.get(searchInputName) as string)?.length > 2) {
      handleSearchCharacters({
        formValues,
        searchTerms: formValues.get(searchInputName) as string,
      });
    }
  }, []);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value?.length && searchTerms?.length > 0) {
        getAllCharacters();
      }
    },
    [searchTerms]
  );

  return {
    submitHandler,
    onInputChange,
  };
};
