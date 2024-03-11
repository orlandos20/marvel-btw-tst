import { createContext } from 'react';

import { Character } from '@/modules/characters/domain/Character';
import { Action } from './charactersReducer';
import { Comic } from '@/modules/comics/domain/Comic';

export interface State {
  loading?: boolean;
  characters: Character[];
  characterData: {
    character: Character;
    comics: Comic[];
  };
  searchTerms: string;
  favorites: Character[];
}

export const initialState: State = {
  loading: false,
  characters: [],
  characterData: {
    character: {} as Character,
    comics: [],
  },
  searchTerms: '',
  favorites: [],
};

export const CharactersContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });
