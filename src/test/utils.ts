import { cleanup, render, RenderOptions } from '@testing-library/react';
import { afterEach } from 'vitest';

import WrapperComponent from './WrapperComponent';

afterEach(() => {
  cleanup();
});

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
