import { Character } from '@/src/modules/characters/domain/Character';
import { State, initialState } from './charactersContext';

export type Action = {
  type: 'loading' | 'setCharacters' | 'searchCharacters' | 'setCharacterData';
  payload: {
    [K in keyof State]?: State[K];
  };
};

export const characterReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case 'loading': {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }
    case 'setCharacters': {
      return {
        ...state,
        characters: action.payload.characters || [],
        searchTerms: '',
      };
    }

    case 'searchCharacters': {
      return {
        ...state,
        characters: action.payload.characters || [],
        ...(action.payload?.searchTerms && {
          searchTerms: action.payload.searchTerms,
        }),
      };
    }

    case 'setCharacterData':
      return {
        ...state,
        characterData: action.payload.characterData || ({} as Character),
      };

    default:
      return state;
  }
};
