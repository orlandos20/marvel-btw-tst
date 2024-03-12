import { describe, expect, test } from 'vitest';

import { mockRequester, mockHasher } from '@/src/test/utils';
import { Character } from '../domain/Character';
import { createCharacterApiRepository } from './CharacterApiService';

describe('character api repository should return an array of Characters on any of his methods is called', () => {
  test('should return an array of characters greater than 1 when "getAll" is called', async () => {
    const expectedResultPayload = {
      code: 200,
      etag: 'asd',
      status: 'Ok' as const,
      data: {
        count: 50,
        limit: 50,
        offset: 10,
        results: [
          { id: 1, name: 'Character 1' },
          { id: 2, name: 'Character 2' },
        ] as Character[],
        total: 1500,
      },
    };

    const requester = mockRequester(expectedResultPayload);

    const characterApiRepository = createCharacterApiRepository({
      requester,
    });

    const result = await characterApiRepository.getAll({
      hasher: mockHasher,
    });

    expect(result).toMatchObject({
      status: 'Ok',
      data: {
        results: [
          { id: 1, name: 'Character 1' },
          { id: 2, name: 'Character 2' },
        ],
      },
    });

    expect(result.data.results).toMatchObject([
      { id: 1, name: 'Character 1' },
      { id: 2, name: 'Character 2' },
    ]);
  });

  test('should return an array length equal to one when "getById" method is called', async () => {
    const expectedResultPayload = {
      code: 200,
      etag: 'asd',
      status: 'Ok' as const,
      data: {
        count: 50,
        limit: 50,
        offset: 10,
        results: [{ id: 1010354, name: 'Adam Warlock' }] as Character[],
        total: 1500,
      },
    };

    const requester = mockRequester(expectedResultPayload);

    const characterApiRepository = createCharacterApiRepository({
      requester,
    });

    const result = await characterApiRepository.getById(1010354);

    expect(result).toMatchObject({
      status: 'Ok',
      data: {
        results: [{ id: 1010354, name: 'Adam Warlock' }],
      },
    });

    expect(result.data.results.length).toEqual(
      expectedResultPayload.data.results.length
    );

    expect(result.data.results).toMatchObject([
      { id: 1010354, name: 'Adam Warlock' },
    ]);
  });

  test('should return an array of characters when "search" method is called', async () => {
    const expectedResultPayload = {
      code: 200,
      etag: 'asd',
      status: 'Ok' as const,
      data: {
        count: 50,
        limit: 50,
        offset: 10,
        results: [
          { id: 1009610, name: 'Spider-Man (Peter Parker)' },
          { id: 1011377, name: 'Spider-Man (Takuya Yamashiro)' },
          { id: 1011010, name: 'Spider-Man (Ultimate)' },
        ] as Character[],
        total: 1500,
      },
    };

    const requester = mockRequester(expectedResultPayload);

    const characterApiRepository = createCharacterApiRepository({
      requester,
    });

    const result = await characterApiRepository.search({
      hasher: mockHasher,
      params: {
        limit: 50,
        offset: 10,
        nameStartsWith: 'spider-man',
      },
    });

    expect(result).toMatchObject({
      status: 'Ok',
      data: {
        results: [
          { id: 1009610, name: 'Spider-Man (Peter Parker)' },
          { id: 1011377, name: 'Spider-Man (Takuya Yamashiro)' },
          { id: 1011010, name: 'Spider-Man (Ultimate)' },
        ],
      },
    });

    expect(result.data.results.length).toEqual(
      expectedResultPayload.data.results.length
    );

    expect(result.data.results).toMatchObject([
      { id: 1009610, name: 'Spider-Man (Peter Parker)' },
      { id: 1011377, name: 'Spider-Man (Takuya Yamashiro)' },
      { id: 1011010, name: 'Spider-Man (Ultimate)' },
    ]);
  });

  //   test('should handle empty response when getAll is called', async () => {
  //     const expectedResultPayload = {
  //       code: 200,
  //       etag: 'asd',
  //       status: 'Ok' as const,
  //       data: {
  //         count: 0,
  //         limit: 50,
  //         offset: 10,
  //         results: [],
  //         total: 0,
  //       },
  //     };

  //     const requester = mockRequester(expectedResultPayload);

  //     const characterApiRepository = createCharacterApiRepository({
  //       requester,
  //     });

  //     const result = await characterApiRepository.getAll({
  //       hasher: mockHasher,
  //     });

  //     expect(result).toMatchObject({
  //       status: 'Ok',
  //       data: {
  //         results: [],
  //       },
  //     });
  //   });
});
