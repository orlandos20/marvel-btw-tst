import { Hasher } from '@/src/types';

export const buildHashParams = (hasher: Hasher): URLSearchParams => {
  const ts = Date.now();
  return new URLSearchParams({
    ts: `${ts}`,
    apikey: import.meta.env.VITE_PUBLIC_API_KEY,
    hash: hasher(
      ts +
        import.meta.env.VITE_PRIVATE_API_KEY +
        import.meta.env.VITE_PUBLIC_API_KEY
    ),
  });
};
