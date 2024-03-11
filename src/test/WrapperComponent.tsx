import React, { PropsWithChildren } from 'react';

import CharacterProvider from '@/contexts/characters/CharacterProvider';

const WrapperComponent: React.FC<PropsWithChildren> = ({ children }) => {
  return <CharacterProvider>{children}</CharacterProvider>;
};

export default WrapperComponent;
