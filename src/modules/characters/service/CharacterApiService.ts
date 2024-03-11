import {
  CharacterRepository,
  GetParams,
} from '@/modules/characters/domain/CharacterRepository';
import { buildHashParams } from '@/src/utils/request-utils';

interface ServiceOptions {
  requester?: typeof window.fetch;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const createCharacterApiRepository = ({
  requester = window.fetch,
}: ServiceOptions = {}): CharacterRepository => {
  const getAll = async ({
    hasher,
    params = {
      limit: 50,
      offset: 10,
    },
  }: GetParams) => {
    const hashParams = buildHashParams(hasher);
    const customParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) =>
      customParams.append(key, value?.toString())
    );

    const response = await requester(
      `${baseUrl}/characters?${customParams}&${hashParams}`
    );

    const parsedResponse = await response.json();

    if (parsedResponse.status === 'Ok') {
      return parsedResponse;
    }

    throw parsedResponse;
  };

  const search = async ({
    hasher,
    params = {
      limit: 50,
      offset: 10,
    },
  }: GetParams) => {
    const hashParams = buildHashParams(hasher);
    const customParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) =>
      customParams.append(key, value?.toString())
    );

    const response = await requester(
      `${baseUrl}/characters?${customParams}&${hashParams}`
    );

    const parsedResponse = await response.json();

    if (parsedResponse.status === 'Ok') {
      return parsedResponse;
    }

    throw parsedResponse;
  };

  const getById = async (characterId: number) => {
    const response = await requester(
      `https://gateway.marvel.com:443/v1/public/characters/${characterId}?apikey=40c33ac9e8cbe259bb9691b2a0fe2ce9`
    );

    const parsedResponse = await response.json();

    if (parsedResponse.status === 'Ok') {
      return parsedResponse;
    }

    throw parsedResponse;
  };

  return {
    getAll,
    search,
    getById,
  };
};
