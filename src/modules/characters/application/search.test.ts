import { describe, test, expect, vi } from 'vitest';

import { mockRequester, mockHasher } from '@/src/test/utils';
import { createCharacterApiRepository } from '../service/CharacterApiService';
import { DefaultParams, Hasher } from '@/src/types';

describe('Characters application layer => search', () => {
  test('should return a MarvelResponseWrapper containing an array of Character objects when getAllCharacters is called with valid hasher and params', async () => {
    // Arrange
    const expectedResultPayload = {
      attributionHTML: '',
      attributionText: '',
      copyright: '',
      code: 200,
      etag: 'asd',
      status: 'Ok' as const,
      data: {
        count: 50,
        limit: 50,
        offset: 10,
        total: 1500,
        results: [
          {
            id: 1,
            name: 'Character 1',
            description: 'Description 1',
            modified: new Date(),
            resourceURI: '',
            urls: [],
            thumbnail: {
              path: '',
              extension: '',
            },
            comics: [],
            stories: [],
            events: [],
            series: [],
          },
        ],
      },
    };

    const requester = mockRequester(expectedResultPayload);

    const characterApiRepository = createCharacterApiRepository({
      requester,
    });

    const hasher = mockHasher;
    const params = {
      limit: 50,
      offset: 10,
    };

    // Act
    vi.mock('./search', async () => ({
      searchCharacters: vi.fn(
        (characterApiRepository) =>
          ({ hasher, params }: { hasher: Hasher; params: DefaultParams }) =>
            characterApiRepository.search({ hasher, params })
      ),
    }));

    const { searchCharacters } = await import('./search');

    // Act

    const result = await searchCharacters(characterApiRepository)({
      hasher,
      params,
    });

    // Assert
    expect(result).toMatchObject(expectedResultPayload);
  });
});
