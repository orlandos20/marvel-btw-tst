import { useEffect, useState } from 'react';
import md5 from 'md5';

import { Character } from '@/modules/characters/domain/Character';
import { createCharacterApiRepository } from '@/modules/characters/service/CharacterApiService';
import { getAllCharacters } from '@/modules/characters/application/getAll';

const characterRepository = createCharacterApiRepository();

const params = {
  limit: 50,
  offset: 10,
};

export const useGetAllCharactersUseCase = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const retrieveAllCharacters = async () => {
    const results = await getAllCharacters(characterRepository)({
      hasher: md5,
      params,
    });

    if (results) {
      setCharacters(results?.data?.results);
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
