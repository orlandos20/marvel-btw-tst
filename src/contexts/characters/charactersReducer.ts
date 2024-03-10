import { State, initialState } from './charactersContext';

export type Action = {
  type: 'loading' | 'setCharacters' | 'setCharacterData';
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
        characters: action.payload.characters || state.characters,
      };
    }

    case 'setCharacterData':
      return {
        ...state,
        characterData: action.payload.characterData || state.characterData,
      };

    default:
      return state;
  }
};
