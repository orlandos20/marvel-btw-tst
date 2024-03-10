import { Hasher } from '@/src/types';

export const buildHashParams = (hasher: Hasher): URLSearchParams => {
  const ts = Date.now();
  return new URLSearchParams({
    ts: `${ts}`,
    apikey: '40c33ac9e8cbe259bb9691b2a0fe2ce9',
    hash: hasher(
      ts +
        '4ae51f8d6481f2664c80ead3dbc749438df0fe7d' +
        '40c33ac9e8cbe259bb9691b2a0fe2ce9'
    ),
  });
};
