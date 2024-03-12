import { describe, test, expect, vi } from 'vitest';

import { mockRequester } from '@/src/test/utils';
import { createCharacterApiRepository } from '../service/CharacterApiService';

describe('Characters application layer => getById', () => {
  test('should return a character object when getById returns a valid response', async () => {
    // Arrange
    const characterId = 1010354;
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
            id: characterId,
            name: 'Adam Warlock',
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

    // Act
    vi.mock('./getById', async () => ({
      getCharacterById: vi.fn(
        (characterApiRepository) => (characterId: number) =>
          characterApiRepository.getById(characterId)
      ),
    }));

    const { getCharacterById } = await import('./getById');

    const requester = mockRequester(expectedResultPayload);

    const characterApiRepository = createCharacterApiRepository({
      requester,
    });

    // Act
    const result = await getCharacterById(characterApiRepository)(characterId);

    // Assert
    expect(result).toMatchObject(expectedResultPayload);
    expect(getCharacterById).toHaveBeenCalledWith(characterApiRepository);
  });
});
