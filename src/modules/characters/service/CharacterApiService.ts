import {
  CharacterRepository,
  GetParams,
} from '@/modules/characters/domain/CharacterRepository';
import { buildHashParams } from '@/src/utils/request-utils';

interface ServiceOptions {
  requester?: typeof window.fetch;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apikey = import.meta.env.VITE_PUBLIC_API_KEY;

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
      `${baseUrl}/characters/${characterId}?apikey=${apikey}`
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
