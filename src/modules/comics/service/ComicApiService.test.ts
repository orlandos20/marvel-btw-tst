import { describe, test, expect } from 'vitest';

import { mockRequester, mockHasher } from '@/test/utils';
import { createComicApiRepository } from './ComicApiService';
import { Comic } from '../domain/Comic';

describe('Comic api repository should return an array of "Comics" when is called', () => {
  test('should return an array of characters greater than 1 ', async () => {
    const expectedResultPayload = {
      code: 200,
      etag: 'asd',
      status: 'Ok' as const,
      data: {
        count: 50,
        limit: 50,
        offset: 10,
        results: [
          {
            id: 106811,
            isbn: '978-1-302-95213-6',
            title: 'Warlock: Rebirth (Trade Paperback)',
          },
          {
            id: 102536,
            isbn: '',
            title: 'Silver Surfer Rebirth: Legacy (2023) #2',
          },
        ] as Comic[],
        total: 1500,
      },
    };

    const requester = mockRequester(expectedResultPayload);

    const comicsApiRepository = createComicApiRepository({
      requester,
    });

    const result = await comicsApiRepository.getByCharacterId({
      hasher: mockHasher,
      characterId: 1010354,
    });

    expect(result).toMatchObject({
      status: 'Ok',
      data: {
        results: [
          {
            id: 106811,
            isbn: '978-1-302-95213-6',
            title: 'Warlock: Rebirth (Trade Paperback)',
          },
          {
            id: 102536,
            isbn: '',
            title: 'Silver Surfer Rebirth: Legacy (2023) #2',
          },
        ],
      },
    });

    expect(result.data.results.length).toEqual(
      expectedResultPayload.data.results.length
    );

    expect(result.data.results).toMatchObject([
      {
        id: 106811,
        isbn: '978-1-302-95213-6',
        title: 'Warlock: Rebirth (Trade Paperback)',
      },
      {
        id: 102536,
        isbn: '',
        title: 'Silver Surfer Rebirth: Legacy (2023) #2',
      },
    ]);
  });

  test('should handle empty response when "getByCharacterId" is called', async () => {
    const expectedResultPayload = {
      code: 200,
      etag: 'asd',
      status: 'Ok' as const,
      data: {
        count: 0,
        limit: 50,
        offset: 10,
        results: [],
        total: 0,
      },
    };

    const requester = mockRequester(expectedResultPayload);

    const comicsApiRepository = createComicApiRepository({
      requester,
    });

    const result = await comicsApiRepository.getByCharacterId({
      hasher: mockHasher,
      characterId: 1010354,
    });

    expect(result).toMatchObject({
      status: 'Ok',
      data: {
        results: [],
      },
    });
  });
});
