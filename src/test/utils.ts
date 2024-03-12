import { cleanup, render, RenderOptions } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

import WrapperComponent from './WrapperComponent';
import { MarvelResponseWrapper } from '../types/marvelApiResponseTypes';
import { Character } from '@/modules/characters/domain/Character';
import { Comic } from '@/modules/comics/domain/Comic';

afterEach(() => {
  cleanup();
});

// Mock the requester function
export const mockRequester = (
  payload: Partial<
    MarvelResponseWrapper<Partial<Character[]> | Partial<Comic[]>>
  >
) =>
  vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue(payload),
  });

export const mockHasher = vi.fn();

function customRender(
  ui: React.ReactElement,
  options: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    // wrap provider(s) here if needed
    // wrapper: ({ children }) => children,
    wrapper: WrapperComponent,
    ...options,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
