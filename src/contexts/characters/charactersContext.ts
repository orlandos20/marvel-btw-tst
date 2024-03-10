import { Character } from '@/src/modules/characters/domain/Character';
import React from 'react';
import { createContext } from 'react';
import { Action } from './charactersReducer';

export interface State {
  loading?: boolean;
  characters: Character[];
  characterData: Character;
  searchTerms: string;
}

export const initialState: State = {
  loading: false,
  characters: [],
  characterData: {} as Character,
  searchTerms: '',
};

export const CharactersContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });
