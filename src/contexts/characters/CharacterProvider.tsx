import { PropsWithChildren, useContext, useReducer } from 'react';

import { CharactersContext, initialState } from './charactersContext';
import { characterReducer } from './charactersReducer';

const CharacterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  return (
    <CharactersContext.Provider value={{ state, dispatch }}>
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharacterContext = () => {
  return useContext(CharactersContext);
};

export default CharacterProvider;
