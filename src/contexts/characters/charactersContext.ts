import { Character } from '@/src/modules/characters/domain/Character';
import React from 'react';
import { createContext } from 'react';
import { Action } from './charactersReducer';
import { Comic } from '@/src/modules/comics/domain/Comic';

export interface State {
  loading?: boolean;
  characters: Character[];
  characterData: {
    character: Character;
    comics: Comic[];
  };
  searchTerms: string;
}

export const initialState: State = {
  loading: false,
  characters: [],
  characterData: {
    character: {} as Character,
    comics: [],
  },
  searchTerms: '',
};

export const CharactersContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });
